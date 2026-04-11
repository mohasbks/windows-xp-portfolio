"use client";
export default function MyDocuments() {
  return (
    <div className="flex flex-col h-full bg-white select-none font-tahoma text-[11px] text-black">
       <div className="flex-1 bg-white p-3 overflow-y-auto">
          <div className="flex flex-wrap gap-6 p-4">
             <div className="flex flex-col items-center gap-1 cursor-pointer p-2 hover:bg-blue-100 border border-transparent hover:border-blue-400 group w-24 text-center">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-0.png" className="w-10 h-10 group-active:brightness-90" />
                <span>My Pictures</span>
             </div>
             <div className="flex flex-col items-center gap-1 cursor-pointer p-2 hover:bg-blue-100 border border-transparent hover:border-blue-400 group w-24 text-center">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-0.png" className="w-10 h-10 group-active:brightness-90" />
                <span>My Music</span>
             </div>
             <div className="flex flex-col items-center gap-1 cursor-pointer p-2 hover:bg-blue-100 border border-transparent hover:border-blue-400 group w-32 text-center" onClick={() => { const link = document.createElement('a'); link.href = '/resume.pdf'; link.download = 'Al-Moatasem_Resume.pdf'; link.click(); }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" className="w-10 h-10 group-active:brightness-90 drop-shadow-md" />
                <span>Al-Moatasem_Resume.pdf</span>
             </div>
          </div>
       </div>
    </div>
  );
}
