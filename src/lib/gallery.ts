"use server";
import data from './gallery-data.json';
import { PlaceHolderImages, ImagePlaceholder } from './placeholder-images';

export type Album = {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string; // id from placeholder images
  images: string[]; // array of image ids
};

export type Video = {
    id: string;
    title: string;
    description: string;
    youtubeId: string;
};

const { albums, videos } = data;

export async function getAlbums(): Promise<Album[]> {
  return albums;
}

export async function getAlbumBySlug(slug: string): Promise<Album | undefined> {
  return albums.find(album => album.slug === slug);
}

export async function getAlbumImages(slug: string): Promise<ImagePlaceholder[]> {
    const album = await getAlbumBySlug(slug);
    if (!album) return [];

    return PlaceHolderImages.filter(img => album.images.includes(img.id));
}

export async function getVideos(): Promise<Video[]> {
    return videos;
}
