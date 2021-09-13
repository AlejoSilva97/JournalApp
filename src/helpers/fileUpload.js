//Este helper sube la imagen y retorna la url de la imagen
export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dxdhholjf/upload';

    //Para el body de la peticion POST
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file);

    try {

        //Para hacer una peticion POST con el metodo fetch es de esta manera
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            //Esto es por si ocurre un error verlo en consola
            throw await resp.json();
        }

    } catch (err) {
        throw err;
    }

}