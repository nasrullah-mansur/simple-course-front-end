"use client"

import {
    ArrowLeftIcon,
    ImageUp,
    XIcon,
    ZoomInIcon,
    ZoomOutIcon,
} from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Cropper,
    CropperCropArea,
    CropperDescription,
    CropperImage,
} from "@/components/ui/cropper"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { useFileUpload } from "@/hooks/use-file-upload"

type Area = { x: number; y: number; width: number; height: number }
interface ImageUploadProps {
    value?: string | null
    onChange: (value: string | null) => void
}

// --- helper for cropping ---
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener("load", () => resolve(image))
        image.addEventListener("error", (error) => reject(error))
        image.setAttribute("crossOrigin", "anonymous")
        image.src = url
    })

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob | null> {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg")
    })
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [
        { files, isDragging },
        { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
    ] = useFileUpload({ accept: "image/*" })

    const previewUrl = files[0]?.preview || null
    const fileId = files[0]?.id

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [zoom, setZoom] = useState(1)

    const previousFileIdRef = useRef<string | undefined | null>(null)

    // ✅ use onCropChange from your cropper
    const handleCropChange = useCallback((pixels: Area | null) => {
        setCroppedAreaPixels(pixels)
    }, [])

    const handleApply = async () => {
        if (!previewUrl || !croppedAreaPixels) return

        try {
            const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels)
            if (!croppedBlob) return

            const newUrl = URL.createObjectURL(croppedBlob)

            if (value) URL.revokeObjectURL(value) // cleanup old blob
            onChange(newUrl)

            setIsDialogOpen(false)
        } catch (err) {
            console.error("Cropping failed", err)
        }
    }

    const handleRemove = () => {
        if (value) URL.revokeObjectURL(value)
        onChange(null)
    }

    // Auto open dialog for new file
    useEffect(() => {
        if (fileId && fileId !== previousFileIdRef.current) {
            setIsDialogOpen(true)
            setCroppedAreaPixels(null)
            setZoom(1)
        }
        previousFileIdRef.current = fileId
    }, [fileId])

    return (
        <div className="inline flex-col items-center gap-2 relative">
            {/* Drop area */}
            <div
                className="border-input w-full h-26 rounded-xl cursor-pointer hover:bg-accent/50 data-[dragging=true]:bg-accent/50 flex items-center justify-center border border-dashed"
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
            >
                {value ? (
                    <img className="object-cover w-20 h-20 rounded-lg" src={value} alt="Uploaded" />
                ) : (
                    <div className="flex flex-col items-center">
                        <ImageUp className="size-6 opacity-60" />
                        <span className="text-xs block pt-2 mb-2">Drop your image here or click to upload</span>

                    </div>
                )}
            </div>

            {/* Remove button */}
            {value && (
                <Button
                    type="button"
                    onClick={handleRemove}
                    size="icon"
                    className="absolute top-0 right-0 size-6 rounded-full border"
                >
                    <XIcon className="size-3.5" />
                </Button>
            )}

            <input {...getInputProps()} className="sr-only" />

            {/* Cropper Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogContent className="gap-0 p-0 sm:max-w-140" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center px-4 py-2 border-b">
                            <Button type="button" variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
                                <ArrowLeftIcon />
                            </Button>
                            <Button className="relative z-999 cursor-pointer hover:bg-foreground" onClick={handleApply} disabled={!previewUrl}>
                                Apply
                            </Button>
                        </DialogTitle>
                    </DialogHeader>

                    {previewUrl && (
                        <Cropper
                            className="h-96 sm:h-120"
                            image={previewUrl}
                            zoom={zoom}
                            onZoomChange={setZoom}
                            onCropChange={handleCropChange}  // ✅ supported by your cropper
                        >
                            <CropperDescription />
                            <CropperImage />
                            <CropperCropArea />
                        </Cropper>
                    )}

                    <DialogFooter className="px-4 py-3 border-t">
                        <div className="flex items-center gap-4 w-full">
                            <ZoomOutIcon size={24} className="opacity-60" />
                            <Slider value={[zoom]} min={1} max={3} step={0.1} onValueChange={(val) => setZoom(val[0])} />
                            <ZoomInIcon size={24} className="opacity-60" />
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
