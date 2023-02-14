import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/KakaoMap.css"

const {kakao} = window;

function KakaoMap(){

   
    useEffect(()=>{
        axios.get("http://59.26.59.60:8080/api/get/List/trash").then((response)=>{

            // 유저 위치 geolocation 사용 하여 받기 
            if (navigator.geolocation) {
    
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function(position) {
                    
                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도
                    
                    var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        
                    
                    // 마커와 인포윈도우를 표시합니다
                    Move(locPosition);
                        
                  });
                
            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                
                var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);   
                   
                    
                    Move(locPosition);
            }
            
            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            function Move(locPosition) {
                var imageSrc = require('../Img/my.png');
                var imageSize = new kakao.maps.Size(23, 23); // 마커이미지의 크기입니다
                var imageOption = {offset: new kakao.maps.Point(8, 20)}; 
            

                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({  
                    image: markerImage, // 마커이미지 설정 
                    position: locPosition
                }); 



                marker.setMap(map);
                
             
             
                
                
                // 지도 중심좌표를 접속위치로 변경합니다
                map.setCenter(locPosition);      
            } 
            
             // 지도 생성 api 
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(33.450701,126.570667),
                level:3
            };
            const map = new kakao.maps.Map(container,options);

            // 마커 생성

            for(let i=0; i<response.data.length; i++){
                let coord = response.data[i];
                console.log(coord)
                var count = coord.count;
                var latitude = coord.latitude;
                var longitude = coord.longitude;
                console.log(count);
                console.log(latitude);
                console.log(longitude);
                var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: markerPosition
                });
                
                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);

                var iwContent = `<div style="padding:5px;">누적 신고수: ${count} <br><a href="https://map.kakao.com/link/map/${latitude},${longitude}" style="color:blue" target="_blank">길찾기</a></div>`

                var infowindow = new kakao.maps.InfoWindow({
                    position : markerPosition, 
                    content : iwContent 
                });

                infowindow.open(map, marker); 

            }
         
        })

       

    },[])
 

    return (<div id="map" className="mapView"></div>)
}

export default KakaoMap;