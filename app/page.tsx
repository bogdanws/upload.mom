"use client";
import React, {useEffect} from 'react';
import './index.css';
import {redirect} from "next/navigation";
import {Upload} from "@/app/Upload";
import Image from "next/image";


export default function Home() {

	return <div className={"mainDiv body-dark"}>
		<div className={"gradient"} />
		<div className={"content"} >
			<Upload />
		</div>
	</div>;
}
