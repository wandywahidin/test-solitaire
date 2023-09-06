import Layout from "@/components/Layout/Layout";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/Atom/Input";
import ButtonPrimary from "@/components/Atom/ButtonPrimary";
import ScrollAnimationWrapper from "@/components/Layout/ScrollAnimationWrapper";
import getScrollAnimation from "../utils/getScrollAnimation";
import axios from "axios";

const home = () => {
  const [user, setUser] = useState([]);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("https://reqres.in/api/user?per_page=12");
    setUser(response.data.data);
    console.log("response", response);
  };

  return (
    <Layout>
      <ScrollAnimationWrapper>
        <div className="max-w-screen-xl min-h-[87vh] mt-24 px-8 xl:px-16 mx-auto">
          <motion.div className="py-6 sm:py-16 grid grid-cols-4" variants={scrollAnimation}>
            {user?.map((item) => {
              return (
                <div key={item.id} className="sm:w-1/4 md:w-full p-2">
                  <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
                    <div className={`mb-3 h-40 w-40 mx-auto rounded-full bg-[${item.color}]`}>
                      
                    </div>
                    <h2 className="text-xl capitalize font-medium text-gray-700">
                      {item.name}
                    </h2>
                    <span className="text-blue-500 block ">{item.year}</span>
                    <span className="text-orange-600 block mb-5">Pantone value : {item.pantone_value}</span>

                    <div className={`px-4 py-2 bg-[${item.color}] text-black rounded-full`}>
                      {item.color}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </ScrollAnimationWrapper>
    </Layout>
  );
};

export default home;
