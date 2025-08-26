type createArticleDto = {
    titre: string,
    prix: number,
    stock: number,
    desc: string,
    cate: string,
    images: string
}

export async function POST({ request }){
    const formData = await request.formData() as unknown as createArticleDto;
    console.log(formData);
    return new Response(JSON.stringify(formData), {status : 200})
}