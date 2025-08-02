'use client';

import React, {useEffect, useRef, useState} from 'react';
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from '@/constants/soundwaves.json';


enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({
                                companionId,
                                name,
                                subject,
                                topic,
                                userName,
                                userImage,
                                voice,
                                style
                            }: CompanionComponentProps) => {


    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {role: message.role, content: message.transcript};
                setMessages((prev) => [newMessage, ...prev]);
            }
        };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (err: Error) => console.log(`message : ${err}`);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError)
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    };

    const handleCall = async () => {

        setCallStatus(CallStatus.CONNECTING);

        const assistantOverrides = {
            variableValues: {subject, topic, style},
            clientMessages: ['transcript'],
            serverMessages: []
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides);
    }

    const handleDisconnect = async () => {

        setCallStatus(CallStatus.INACTIVE);
        vapi.stop();
    }

    return (
        <section className="flex flex-col h-[70vh]">

            <section className="flex gap-8 max-sm:flex-col">

                <div className="companion-section">
                    <div className="companion-avatar" style={{backgroundColor: getSubjectColor(subject)}}>
                        <div
                            className={cn('absolute transition-opacity duration-100',
                                callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                                callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={50} height={50}/>
                        </div>
                        <div
                            className={cn('absolute transition-opacity duration-100',
                                callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="font-bold text-xl">{name}</p>
                    </div>
                </div>
                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage} alt={userName} width={130} height={130} className="rounded-lg"/>
                        <p className="font-bold text-xl">{userName}</p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone} disabled={ callStatus !== CallStatus.ACTIVE}>
                        <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="mic" width={36}
                               height={36}/>
                        <p className="max-sm:hidden">{isMuted ? 'Turn on microphone' : 'Turn off microphone'}</p>
                    </button>
                    <button
                        className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')}
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING ? "Connecting" : "Start Session"}
                    </button>
                </div>

            </section>
            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map(({role, content},index) => {
                        if (role === 'assistant') {
                            return (<p key={index} className="max-sm:text-sm">
                                {name
                                    .split(' ')[0]
                                    .replace('/[.,]/g, ', ' ')
                                }: {content}</p>)
                        } else {
                            return (<p key={index} className="text-primary max-sm:text-sm">
                                {userName} : {content}
                            </p>)
                        }
                    })}
                </div>
                <div className="transcript-fade"/>
            </section>

        </section>
    );
};

export default CompanionComponent;
