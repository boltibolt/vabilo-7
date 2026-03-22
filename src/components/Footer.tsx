import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-4 paper-texture bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A962]" />
          <Heart className="w-4 h-4 text-[#C9A962] fill-[#C9A962]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A962]" />
        </div>
        
        <img
  src="/ime-slike.png"
  alt="Patricia in Mitja"
  className="mx-auto mb-2 h-auto w-[260px] sm:w-[320px] object-contain"
/>
       
        
        <p className="font-body text-sm text-[#7A7A7A]">
          6. junij 2026
        </p>
        
        <div className="mt-6 pt-6 border-t border-[#E5DDD3]">
          <p className="font-body text-xs text-[#7A7A7A]">
            Z ljubeznijo vabljeni na najin poročni dan
          </p>
        </div>
      </div>
    </footer>
  );
}
