function SpeechBubble({ children }) {
    return (
        <div className='relative inline-block'>
            
            <div className='relative overflow-hidden rounded-3xl border-4 border-black bg-[#CDB4DB] px-6 py-3'>
                <div className='relative z-10'>{children}</div>
                <div className='absolute top-2 right-2 h-7 w-7 rotate-90 rounded-full
                    border-5 border-transparent
                    border-t-white border-l-white'/>
            </div>

            <div className='absolute -bottom-3 left-8 h-0 w-0
                             border-l-10 border-l-transparent
                             border-r-10 border-r-transparent
                             border-t-14 border-t-black' />
            <div className='absolute -bottom-2.25 left-8.5 h-0 w-0
                             border-l-10 border-l-transparent
                             border-r-10 border-r-transparent
                             border-t-20 border-t-[#CDB4DB]'/>
        </div>
    );
}

export default SpeechBubble;