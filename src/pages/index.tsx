import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThreeDCardDemo from '../components/CardContainer/3d-card-demo';
import GlobeDemo from  '../components/globe/cGlobe';
import Layout from '@theme/Layout';
import {ShootingStars} from "@site/src/components/shooting-stars/shooting-stars";
import {StarsBackground} from "@site/src/components/shooting-stars/stars-background";
export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
      <Layout>
              <div className="tailwind">
                  <div className="h-[40rem] rounded-md dark:bg-black flex flex-col items-center justify-center relative w-full">
                      <ShootingStars />
                      <StarsBackground />
                      <ThreeDCardDemo/>
                  </div>
                  <GlobeDemo/>

              </div>

      </Layout>


  );
}
