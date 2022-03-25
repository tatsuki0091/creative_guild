import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/app.scss";
import axios, { AxiosResponse } from "axios";

type PhotographerInfo = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    bio: string;
    profile_picture: string;
    created_at: Date;
    updated_at?: Date;
    albums: [
        {
            id: number;
            title: string;
            description: string;
            img: string;
            date: Date;
            featured: number;
            photographer_id: number;
            created_at: Date;
            updated_at?: Date;
        }
    ];
};

const App = () => {
    const getPhotoGrapherAlbums = async () => {
        // const { data } = await axios.get<PhotographerInfo>("api/photographer");
        // setPhotographerInfo(data);
        // Use axios to fetch the data from API.
        await axios
            .get<PhotographerInfo>("api/photographer")
            .then((res: AxiosResponse<PhotographerInfo>) => {
                const { data } = res;
                // Set data to the state
                setPhotographerInfo(data);
            })
            .catch((err) => {
                console.log(err);
                alert("We could not get datas. Please try later");
            });
    };

    const [photographerInfo, setPhotographerInfo] =
        useState<PhotographerInfo>();

    useEffect(() => {
        getPhotoGrapherAlbums();
    }, []);

    return (
        <>
            <main className="max-w-6xl mx-auto mt-12 antialiased">
                <div className="container px-4 bg-gray-200 mx-auto">
                    <div className="lg:space-x-5 lg:flex lg:flex-row item-center lg:-mx-4 flex flex-wrap flex-col-reverse text-center lg:text-left">
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 ml-16 lg:mt-10 lg:mb-10">
                            <img
                                src={photographerInfo?.profile_picture}
                                alt="Profile"
                                className="rounded-full"
                                width={220}
                                height={270}
                                placeholder="blur"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 lg:mt-10 lg:mb-10">
                            <h2 className="name">{photographerInfo?.name}</h2>
                            <div className="w-full text-lg">
                                <p className="mb-4">{photographerInfo?.bio}</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 mr-10 lg:mt-20 lg:mb-10">
                            <p className="w-full">Phone</p>
                            <p className="w-full contact-info">
                                {photographerInfo?.phone_number}
                            </p>
                            <p className="w-full">Email</p>
                            <p className="w-full contact-info">
                                {photographerInfo?.email}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {typeof photographerInfo !== "undefined" &&
                        photographerInfo?.albums.length > 0 &&
                        photographerInfo?.albums.map((album) => (
                            <div className="rounded overflow-hidden bg-white shadow-lg">
                                <div className="box">
                                    <img
                                        className="w-full h-56"
                                        src={album.img}
                                        alt="Content"
                                    />
                                    <h3 className="m-3">{album.title}</h3>
                                </div>
                                <div className="px-6 py-2">
                                    <p className="text-base">
                                        {album.description}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    {album.featured === 1 ? (
                                        <>
                                            <div className="frame">
                                                <span className="left">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        color="red"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="right">
                                                    {album.date}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-right">
                                            {album.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </main>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
