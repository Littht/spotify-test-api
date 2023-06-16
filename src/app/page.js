import Image from 'next/image'
import styles from './page.module.css'
import {Spotify} from './components/Spotify'
//import {Layout} from './components/Layout'

export default function Home() {
  return (
    <main className={styles.main}>

        <Spotify/>

    </main>
  )
}
