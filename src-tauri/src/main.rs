#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use opencv::{prelude::*, videoio::{VideoCapture, VideoCaptureProperties}, imgproc::COLOR_BGRA2RGBA, core::CV_8UC4};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_frame])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_frame(num:f64) -> Vec<u8> {
  println!("get_frame");
  let mut vid = VideoCapture::from_file("test.mp4", 0).unwrap();
  vid.set(VideoCaptureProperties::CAP_PROP_POS_FRAMES as i32,num).unwrap();
  //let mut vec = Vec::<u8>::with_capacity(1280*720);
  let mut mat = unsafe {Mat::new_nd(2, &(1280*720), CV_8UC4).unwrap()};
  //let mut mat = Mat::new_nd_vec_with_default(&Vector::from_slice(&[1280,720]), CV_8UC4,None).unwrap();
  match vid.read(&mut mat) {
    Ok(o) => println!("{}",o),
    Err(b) => panic!("{:?}",b),
  }
  opencv::imgproc::cvt_color(&mat.clone(), &mut mat, COLOR_BGRA2RGBA, 4).unwrap();
  match mat.data_bytes(){
    Ok(o)=>{return o.to_vec()},
    Err(o)=>{
      println!("{:?}",o);
      panic!("{:?}",o)
    }
  }
}