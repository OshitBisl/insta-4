import Head from 'next/head'

import Headers from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/Pic.jpgg" />
      </Head>
      
      {/* Modal */}
      <Modal />

      {/* Header */}
      <Headers  />

      {/* Feed */}
      <Feed />

    </div>
  )
}