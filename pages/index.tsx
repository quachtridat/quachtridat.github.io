import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { getPostData } from '../lib/posts'
import ToggleButton from '../components/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faHackerrank, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'
import { EMAIL_ADDRESS, GITHUB_URL, HACKERRANK_URL, LINKEDIN_URL } from '../globals.config'

export interface HomeProps {
  selfIntro: string;
}

const quicklinks: { url: string, icon: IconDefinition }[] = [
  { url: GITHUB_URL, icon: faGithub },
  { url: HACKERRANK_URL, icon: faHackerrank },
  { url: LINKEDIN_URL, icon: faLinkedinIn },
  { url: `mailto:${EMAIL_ADDRESS}`, icon: faEnvelope },
];

export const Home = ({ selfIntro }: HomeProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-0 text-black transition-colors duration-500 ease-in-out bg-white dark:bg-black dark:text-white">
      <Head>
        <title>Dat Quach</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="flex items-center justify-center w-full h-10 border-gray-200 dark:border-gray-800">
        <span className="flex items-center">
          <ToggleButton defaultChecked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="mx-5" />
        </span>
      </header>

      <main className='flex flex-col items-center justify-center flex-1 p-4'>
        <p className="text-2xl">
          Hello, I am
        </p>

        <h1 className="text-7xl">
          Dat Quach
        </h1>

        <p className="mt-10 text-center">
          {selfIntro}
        </p>

        <section className="flex flex-row justify-between w-2/4 mt-10">
          {
            quicklinks.map(({ url, icon }, idx) => {
              return (
                <Link href={url} key={idx}>
                  <span className="inline-block w-10 h-10 mx-3 focus:outline-none focus:ring focus:ring-offset-2"><FontAwesomeIcon icon={icon} /></span>
                </Link>
              );
            })
          }
        </section>

        <section className="mt-14">
            <Link href="/static/docs/resume.pdf">
              <span className="p-3 text-lg text-black transition-colors duration-500 ease-in-out bg-white border-2 border-black border-solid shadow-lg focus:outline-none focus:ring focus:ring-offset-2 hover:text-white hover:bg-black px-7 rounded-xl dark:border-white dark:bg-black dark:hover:bg-white dark:text-white dark:hover:text-black">
                My Resume
              </span>
            </Link>
        </section>
      </main>

      <footer className="w-full h-10 border-gray-200 dark:border-gray-800">

      </footer>
    </div>
  )
}

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // return default props
  return {
    props: {
      selfIntro: (await getPostData("self-introduction")).content
    }
  };
}