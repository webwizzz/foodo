'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { opacity, slideUp } from './animation';
import styles from './style.module.scss';

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({width: 0, height:0});

    useEffect( () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
    }, [])

    useEffect( () => {
        console.log('Current word index:', index, 'Word:', words[index]);
        if(index == words.length - 1) {
            setTimeout(() => {
                console.log('Loading complete called');
                onLoadingComplete?.();
            }, 1000);
            return;
        }
        setTimeout( () => {
            setIndex(index + 1)
        }, index == 0 ? 1000 : 150)
    }, [index, onLoadingComplete])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.3}
        }
    }

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
            <motion.p 
                variants={opacity} 
                initial="initial" 
                animate="enter"
                style={{ color: '#000000', fontSize: '50px', fontWeight: 500 }}
            >
                <span style={{ 
                    width: '10px', 
                    height: '10px', 
                    backgroundColor: '#000000', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    left: '-20px', 
                    top: '50%', 
                    transform: 'translateY(-50%)' 
                }}></span>
                {words[index]}
            </motion.p>
            {dimension.width > 0 && (
                <svg>
                    <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                </svg>
            )}
        </motion.div>
    )
}
