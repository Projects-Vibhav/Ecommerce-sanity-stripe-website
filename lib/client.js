import sanityCLient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client  = sanityCLient({
    projectId:'fq3rla1d',
    dataset:'production',
    apiVersion:'2003-01-15',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN

});

const builder  = imageUrlBuilder(client); // Client is the client that was just created . This is for using the sanity images

export const urlFor  = (source) => builder.image(source); // Accesing urls of sanity images
