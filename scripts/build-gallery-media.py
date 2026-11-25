"""Rebuild the 2026 campus photo film and cropped school-event details.

Run from any directory with Pillow (including WebP and AVIF) and ffmpeg.
Inputs are school photographs and a real dance recording already held in
assets/media. The accompanying gallery catalogue selects public derivatives.
"""
from io import BytesIO
from pathlib import Path
from tempfile import TemporaryDirectory
import subprocess

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PHOTOS = ROOT / "assets/media/photos"
VIDEOS = ROOT / "assets/media/videos"
FPS = 24
FRAME = (1280, 720)
FFMPEG = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y"]
H264 = ["-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
        "-threads", "3", "-an", "-map_metadata", "-1", "-movflags", "+faststart"]


def sizes(image, photo_id, widths):
    for width in widths:
        height = round(width * image.height / image.width)
        scaled = image.resize((width, height), Image.Resampling.LANCZOS)
        scaled.save(PHOTOS / f"{photo_id}-{width}.webp", quality=77, method=6, exif=b"")
        scaled.save(PHOTOS / f"{photo_id}-{width}.avif", quality=65, speed=6, exif=b"")


def still_details():
    # The table crop excludes the chin and badges at the top of the source.
    table = Image.open(PHOTOS / "place-value-blocks-1200.webp").convert("RGB")
    sizes(table.crop((100, 108, 1180, 748)), "place-value-table", [384, 720, 1080])
    # Striped sashes, ribbons and hands; the group faces stay out of the frame.
    cadets = Image.open(PHOTOS / "ncc-cadets-1200.webp").convert("RGB")
    sizes(cadets.crop((449, 173, 961, 461)), "ncc-sashes", [320, 512])


def dance_detail():
    # 1.5–9.5 s of the original school dance. This fixed crop stays below the
    # dancers' heads throughout the shot. Voices and performance music are omitted.
    output = VIDEOS / "lawn-dance-detail-448.mp4"
    subprocess.run(FFMPEG + ["-ss", "1.5", "-i", str(VIDEOS / "house-dance-720.mp4"),
                            "-t", "8", "-vf", "crop=448:252:250:464,fps=24",
                            "-map", "0:v:0"] + H264 + ["-maxrate", "340k", "-bufsize", "680k", str(output)], check=True)
    frame = subprocess.check_output(FFMPEG + ["-ss", "2.7", "-i", str(output),
                                              "-frames:v", "1", "-f", "image2pipe",
                                              "-vcodec", "png", "-"])
    sizes(Image.open(BytesIO(frame)).convert("RGB"), "dance-footwork", [320, 448])


def campus_film(working_dir):
    # Each source rectangle is deliberately 16:9. The first frame excludes a
    # distant bystander at the left edge of the published entrance photograph.
    shots = [
        ("campus-front-1600.webp", (260, 105, 1540, 825)),
        ("first-school-room-1120.webp", (0, 154, 1120, 784)),
        ("computer-lab-wide-1200.webp", (0, 156, 1200, 831)),
        ("science-bench-828.webp", (0, 46, 824, 510)),
        ("basketball-court-1200.webp", (94, 0, 1086, 558)),
    ]
    output = working_dir / "campus-master.mp4"
    command = FFMPEG + ["-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "1280x720",
                        "-framerate", str(FPS), "-i", "-"] + H264 + ["-maxrate", "720k", "-bufsize", "1440k", str(output)]
    with subprocess.Popen(command, stdin=subprocess.PIPE) as enc:
        last_frame = None
        for index, (filename, box) in enumerate(shots):
            picture = Image.open(PHOTOS / filename).convert("RGB").crop(box)
            if index == 0:
                sizes(picture, "campus-spaces-poster", [480, 800, 1200])
            for frame in range(FPS * 4):
                # A slow 2.5% push-in and a ten-frame dissolve at each cut.
                progress = frame / (FPS * 4 - 1)
                inset = .0125 * progress
                crop = (picture.width * inset, picture.height * inset,
                        picture.width * (1 - inset), picture.height * (1 - inset))
                current = picture.transform(FRAME, Image.Transform.EXTENT, crop,
                                            Image.Resampling.BICUBIC)
                if last_frame is not None and frame < 10:
                    current = Image.blend(last_frame, current, (frame + 1) / 10)
                enc.stdin.write(current.tobytes())
            last_frame = current
        enc.stdin.close()
        if enc.wait():
            raise RuntimeError("ffmpeg failed to encode the campus film")


    # A low-burst, short-GOP H.264 encode plays and seeks in the mobile
    # WebKit player. Keep its high-resolution poster as a separate image.
    subprocess.run(FFMPEG + [
        "-i", str(output), "-vf", "scale=854:480:flags=lanczos,setsar=1",
        "-c:v", "libx264", "-profile:v", "baseline", "-level:v", "3.0",
        "-pix_fmt", "yuv420p", "-threads", "2", "-crf", "26",
        "-maxrate", "410k", "-bufsize", "410k", "-bf", "0", "-g", "48",
        "-keyint_min", "48", "-x264-params", "ref=1:scenecut=0:nal-hrd=vbr",
        "-an", "-map_metadata", "-1", "-movflags", "+faststart",
        str(VIDEOS / "campus-spaces-480.mp4"),
    ], check=True)


if __name__ == "__main__":
    still_details()
    dance_detail()
    with TemporaryDirectory() as temporary:
        campus_film(Path(temporary))
    for file in ("campus-spaces-480.mp4", "lawn-dance-detail-448.mp4"):
        print(f"{file}: {(VIDEOS / file).stat().st_size} bytes (published-media.json)")
