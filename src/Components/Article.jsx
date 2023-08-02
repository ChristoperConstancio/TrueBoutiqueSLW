import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import "firebase/auth";
import "firebase/analytics";


const Article = () => {
    
    return (
        <>
            <div className="">

                <h1>Hola</h1>

            </div>
        </>
    );
};

export default Article;
