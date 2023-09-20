const MAX_WIDTH = 5120, MAX_HEIGHT = 5120;

export async function toWebp(file: File) {
    return new Promise<Blob>((resolve, reject) => {
        let rawImage = new Image();

        const canvas = document.createElement('canvas'), ctx = canvas.getContext("2d");
        if (!ctx) return reject();

        rawImage.onload = () => {
            if (rawImage.src) {
                let width = rawImage.width, height = rawImage.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(rawImage, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (!blob) reject();
                    else resolve(blob);
                }, "image/webp");
            }
        };

        rawImage.src = URL.createObjectURL(file);
        rawImage.crossOrigin = 'Anonymous';
    });
}

export function handleDrop(uploadImage: (file: Blob) => Promise<string>) {
    return async (editor: any, event: DragEvent, _: any, moved: boolean) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            if ((file.type.startsWith('image/')) && file.size < 10 * 1024 * 1024) {
                const img = new Image(), blob = await toWebp(file);
                img.src = URL.createObjectURL(blob);
                img.onload = () => {
                    uploadImage(blob).then((src) => addImage(editor.view, src, editor.view.posAtCoords({
                        left: event.clientX,
                        top: event.clientY
                    })?.pos)).catch(() => window.alert("There was a problem uploading your image, please try again."));
                };
            } else window.alert("Images need to be in jpg or png format and less than 10mb in size.");
            return true;
        }
        return false;
    }
}

export function addImage({state, dispatch}: any, src: string, pos?: number) {
    const {tr, schema, selection} = state;
    const node = schema.nodes.image.create({src});
    if (pos === undefined) pos = selection.$to.pos;
    const transaction = tr.insert(pos, node);
    return dispatch(transaction);
}