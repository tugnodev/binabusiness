import { json, type RequestHandler } from '@sveltejs/kit';
import { articleRepo } from '$lib/server/domaine/articleRepo.js';
import type { CreateArticle, CreateArticleDto } from '$lib/server/domaine/articleRepo.js';
import { imageFsRepo, imageRepo } from '$lib/server/domaine/imageRepo.js';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.formData();
    console.log(data);
    const articleData: CreateArticle = {
      userId: data.get('userId')?.toString() ?? '',
      titre: data.get('titre')?.toString() ?? '',
      description: data.get('description')?.toString() ?? '',
      tag: data.get('tag')?.toString() ?? '',
      prix: Number(data.get('prix') ?? 0),
      stock: Number(data.get('stock') ?? 0),
      images: data.getAll('images') as File[]
    };

    if (!articleData.userId || !articleData.titre || Number.isNaN(articleData.prix) || Number.isNaN(articleData.stock)) {
      return json(
        { success: false, message: 'Invalid input' },
        { status: 400 }
      );
    }

    const imagePromises = articleData.images!.map(image => imageFsRepo.saveImage(image));
    const imageUrls = await Promise.all(imagePromises);
    console.log(imageUrls);

    const articleDataDto: CreateArticleDto = {
      userId: articleData.userId,
      titre: articleData.titre,
      description: articleData.description,
      tag: articleData.tag,
      prix: articleData.prix,
      stock: articleData.stock,
    };
    // Create article with the saved image URLs
    const article = await articleRepo.create(articleDataDto)
    console.log(article);

    //save images
    const images = await imageRepo.saveImage(article.id, imageUrls)
    console.log(images);

    return json({
      success: true,
      message: 'Article created successfully',
      article,
      images
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return json(
      { success: false, message: 'Error creating article' },
      { status: 500 }
    );
  }
};

export const DELETE: RequestHandler = async ({ request }) => {
  try {
    const id = await request.json();
    console.log(id);
    await articleRepo.delete(Number(id));

    return json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return json(
      { success: false, message: 'Error deleting article' },
      { status: 500 }
    );
  }
};

export const PATCH: RequestHandler = async (event) => {
  try {
    const data = await event.request.formData();
    console.log(data.get('articleId'));
    const articleId = parseInt(data.get('articleId')?.toString() ?? '0');
    const articleData: CreateArticleDto = {
      userId: data.get('userId')?.toString() ?? '',
      titre: data.get('titre')?.toString() ?? '',
      description: data.get('description')?.toString() ?? '',
      tag: data.get('tag')?.toString() ?? '',
      prix: Number(data.get('prix') ?? 0),
      stock: Number(data.get('stock') ?? 0),
      images: JSON.parse(data.get('images')?.toString() ?? '[]') as string[]
    };
    
    const article = await articleRepo.update(articleId, articleData);
    return json({
      success: true,
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return json(
      { success: false, message: 'Error updating article' },
      { status: 500 }
    );
  }
};

//export const uploadImage: RequestHandler = async (event) => {
//  try {
//    const data = await event.request.formData();
//    const articleId = parseInt(data.get('articleId')?.toString() ?? '0');
//    const image = data.get('image') as File;
//    const imageResult = await imageRepo.saveImage(articleId, [image]);
//    return json({ success: true, image: imageResult });
//  } catch (error) {
//    console.error('Error uploading image:', error);
//    return json(
//      { success: false, message: 'Error uploading image' },
//      { status: 500 }
//    );
//  }
//};