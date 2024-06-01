"use client";
import React, { useEffect, useState } from 'react';

export default function GraphFieldTextModal(props) {

  const [authAnimation, setAnimation] = useState();

  useEffect(() => {
    openAuthModal();
  }, []);

  useEffect(()=>{
    openAuthModal();
    console.log(props)
  },[props])

  function openAuthModal() {
    let authAnimations = gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to("#authOverlay", { scaleY: 0.01, x: 1, opacity: 1, display: "flex", duration: 0.4 })
      .to("#authOverlay", { scaleY: 1, background: "rgba(255,255,255,0.16)", duration: 0.6 })
      .to("#authOverlay #second", { scaleY: 1, opacity: 1, duration: 0.6 }, "-=0.4")
      .to("#authOverlay #third", { scaleY: 1, opacity: 1, duration: 0.4 }, "-=0.2")
      .to("#authOverlay #fourth", { background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.3)", duration: 0.8 }, "-=0.4")
    setAnimation(authAnimations);
  }

  function closeAuthModal() {
    authAnimation.reverse().timeScale(-1.6);
    setTimeout(() => {
      props.closeModal();
    }, 900);
  }
  return (
    <div className="w-full h-screen bg-gradient-to-tr">
      <div
        id="authOverlay"
        className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-white/80 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
      >
        <div
          id="fourth"
          className="bg-white/0 w-[40%] p-3 border border-white/0 rounded-2xl shadow-sm"
        >
          <div
            id="second"
            className="bg-white p-4 sm:p-8 w-full rounded-xl shadow-sm scale-y-0 opacity-0"
          >
            <div id="third" className="relative scale-y-0 opacity-0">
              <h1 className="text-green-600 text-4xl font-[Montserrat] mb-4 text-center">
                {props.modalTitle}
              </h1>
              <form onSubmit={(e) => props.handleFormSubmit(e)}>
                <div className="flex mt-5 p-5 flex-col space-y-1">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-500">{props.textField}</label>
                  <input
                    type={props.fieldType}
                    id={props.textField}
                    required
                    name={props.textField}
                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
                  />
                </div>
                <div className="text-end p-5">
                  <button
                      type='submit'
                      className="px-4 py-2 text-lg mx-1 text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                      >
                      Submit
                    </button>
                    <button
                    type='button'
                      onClick={closeAuthModal}
                      className="px-4 py-2 text-lg mx-1 transition-colors duration-300 bg-white border text-green-600 rounded-md shadow hover:bg-green-600 hover:text-white focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      Close
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
