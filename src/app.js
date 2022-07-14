//import { invoke } from "@tauri-apps/api/tauri";
// @ts-ignore
const invoke = window.__TAURI__.invoke;
let arr_cv = [];
async function main() {
    let cv_wrap = document.getElementById("canvas-wrap");
    let canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    cv_wrap.appendChild(canvas);
    //arr_cv.push(canvas);
    let ctx = canvas.getContext("2d");
    let img = document.createElement("img");
    img.src = "./back.png";
    await img.decode();
    ctx.drawImage(img, 0, 0);
    let dat = ctx.getImageData(0, 0, 1280, 720);
    //console.log(dat);
    let ccv = document.createElement("canvas");
    ccv.width = 1280;
    ccv.height = 720;
    let cctx = ccv.getContext("2d");
    cctx.fillStyle = "#f510f4";
    cctx.fillRect(100, 100, 100, 100);
    cv_wrap.appendChild(ccv);
    let a = await invoke("get_frame", { num: 10 });
    if (!(a instanceof Uint8ClampedArray)) {
        return;
    }
    let Image = new ImageData(a, 1280);
    cctx.putImageData(Image, 0, 0);
    console.log(a);
    // let cc = document.createElement("canvas");
    // cc.width = 1280;
    // cc.height = 720;
    // let cctx = cc.getContext("2d");
    // cctx.putImageData(dat, 0, 0);
    // document.body.appendChild(cc);
    // if (!(canvas instanceof HTMLCanvasElement)) {
    //   return;
    // }
    //let elem = document.createElement("img");
    //ctx.putImageData(dat, 0, 0);
}
main();
class global_data {
}
class frame {
}
//# sourceMappingURL=app.js.map