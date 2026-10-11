use std::env;
use std::fs;
use std::path::PathBuf;

fn main() {
    let target_os = env::var("CARGO_CFG_TARGET_OS").unwrap();

    if target_os == "windows" {
        let manifest_dir = PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap());
        let lib_dir = manifest_dir.join("lib");

        //* Linking to MediaInfo.lib
        println!("cargo:rustc-link-search=native={}", lib_dir.display());
        println!("cargo:rustc-link-lib=dylib=MediaInfo");

        //* Rerun build.rs if the library or build script changes
        println!("cargo:rerun-if-changed=build.rs");
        println!("cargo:rerun-if-changed=lib/MediaInfo.lib");

        //* Copying the MediaInfo DLL to the runtime directory
        let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());
        if let Some(target_dir) = out_dir.ancestors().nth(3) {
            let src_dll = lib_dir.join("MediaInfo.dll");
            let dst_dll = target_dir.join("MediaInfo.dll");
            let _ = fs::copy(&src_dll, &dst_dll);
        }
    } else {
        println!("cargo:rustc-link-lib=dylib=mediainfo");
        println!("cargo:rustc-link-lib=dylib=zen");
    }

    tauri_build::build();
}