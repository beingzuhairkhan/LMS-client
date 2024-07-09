import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
    videoUrl: string;
    title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    useEffect(() => {
        if (videoUrl) {
            console.log('Sending request with videoUrl:', videoUrl);
             axios.post("https://lms-10.onrender.com/api/v1/getVdoCipherOTP", {
                videoId: videoUrl,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log('Response data:', res.data);
                setVideoData(res.data);
            }).catch((error) => {
                console.error('Error fetching video data:', error);
            });
        }
    }, [videoUrl]);

    return (
        <div style={{ paddingTop: "38%", position: "relative" , overflow:"hidden"}}>
            {
                videoData.otp && videoData.playbackInfo && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=AJ3JgEFooM1HeKwb`}
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                    />
                )
            }
        </div>
    );
};

export default CoursePlayer;
