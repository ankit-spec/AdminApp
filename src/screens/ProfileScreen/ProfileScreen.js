//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AddPostView from '../../components/AddPostView'
// create a component
const ProfileScreen = () => {
    const [images, setimages] = useState([])
    const openImagePicker=()=>{
        let imageList=[]
        ImagePicker.openPicker({
            multiple:true,
            waitAnimationEnd:false,
            includeExif:true,
            forceJpg:true,
            compressImageQuality:0.8,
            maxFiles:5,
            mediaType:'any',
            includeBase64:true
        })
        .then(response=>{
            console.log('Response',response)
            response.map(image=>{
                imageList.push({
                    filename:image.filename,
                    path:image.path,
                    data:image.data
                })
            })
            setimages(imageList)
        })
        .catch(e=>console.log('Error'))
        
    }
    return (
     <AddPostView
     newImages={imageList}
     addImages={openImagePicker}
     />
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ProfileScreen
