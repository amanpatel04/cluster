import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const generateThumbnail = (videoPath, outputDir, id) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('end', () => {
        resolve(path.join(outputDir, `${id}.webp`));
      })
      .on('error', (error) => {
        reject(error);
      })
      .screenshots({
        timestamps: ['00:00:01.000'],
        filename: `${id}.webp`,
        folder: outputDir,
      });
  })
}

export default generateThumbnail