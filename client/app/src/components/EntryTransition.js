import {motion} from 'framer-motion';

const EntryTransition = (props) => {
    console.log("Prop value is: " + props.value);
    return (
        <>
        <motion.div className="absolute z-50 bg-[#e8ffc4] w-[100vw] h-[18.6vh] rounded-tr-full rounded-br-full right-full"
            transition={{ ease: "easeOut", duration: 1, times: [0,0.5,1] }}
            animate={{
                x: [0, window.innerWidth, 0+70]
            }}
            exit={{x: window.innerwidth}}>
        </motion.div>

        <motion.div className="absolute z-50 bg-[#fbffe6] w-[100vw] top-[25.6vh] h-[18.6vh] rounded-tr-full rounded-br-full right-full"
            transition={{ ease: "easeOut", duration: 0.85, times: [0,0.5,1]}}
            animate={{
                x: [0, window.innerWidth, 0+70]
            }}> 
        </motion.div>

        <motion.div className="absolute z-50 bg-[#BBD915] w-[100vw] top-[44.2vh] h-[18.6vh] rounded-tr-full rounded-br-full right-full"        
            transition={{ ease: "easeOut", duration: 0.65, times: [0,0.5,1] }}
            animate={{
                x: [0, window.innerWidth, 0+70]
            }}>
        </motion.div>

        <motion.div className="absolute z-50 bg-[#ff985c] w-[100vw] top-[62.8vh] h-[18.6vh] rounded-tr-full rounded-br-full right-full"        
            transition={{ ease: "easeOut", duration: 0.75, times: [0,0.5,1] }}
            animate={{
                x: [0, window.innerWidth, 0+70]
            }}>
        </motion.div>

        <motion.div className="absolute z-50 bg-[#ffb759] w-[100vw] top-[81.4vh] h-[18.6vh] rounded-tr-full rounded-br-full right-full"    
            transition={{ ease: "easeOut", duration: 1.15, times: [0,0.5,1]  }}    
            animate={{
                x: [0, window.innerWidth, 0+70]
            }}>
        </motion.div>
        </>
    )

}

export default EntryTransition;