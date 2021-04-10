import React, {useRef, useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { GET_ME } from '../../utils/queries';
import { SAVE_STATS } from '../../utils/mutations';
import  Auth  from '../../utils/Auth';


let pinnedLocationCount = 0;
let courtLineColor = 'teal';
let paintColor = 'lime';
let playerInnerColor = 'white';
let token = Auth.getToken();
let user = Auth.getProfile();
console.log(user)
// console.log(token);
// console.log(user);
//let token = the token stored in local storage.

// let courtLineColor = 'red';
// let paintColor = 'white';
// let playerInnerColor = 'yellow';

function Court() {

    
    const {loading, err, data} = useQuery(GET_ME);
    let canvasWidth = window.innerWidth <= 500 ? window.innerWidth : 500;
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        console.log(loading)
        console.log(data)
        if (data) {
            let coordinates = data.me.savedStats
            // let 
            console.log(data)
            // data
            for (let i = 0; i<coordinates.length; i++) {
                let x = coordinates[i].x
                let y = coordinates[i].y
                ctx.beginPath();
                ctx.arc(x, y, 10, 0,2*Math.PI)
                ctx.fillStyle = playerInnerColor;
                ctx.fill();
            }
        }
    
    }, [data])


    
    //get mouse position custom hook
    const useMousePosition = () => {
        //useState hook to set the mousePosition
        const [mousePosition, setMousePosition] = useState({ xPos: null, yPos: null});
        //event that changes the mousePosition to current mouse position when called
        const updateMousePosition = e => {
            setMousePosition({ xPos: e.clientX, yPos: e.clientY-88 });
        };
        useEffect(() => {
            window.addEventListener('click', updateMousePosition);

            return () => window.removeEventListener('click', updateMousePosition);
        }, []);

        return mousePosition;
    };


    
    let { xPos, yPos } = useMousePosition();
    const [addStats] = useMutation(SAVE_STATS);

    async function newPin(e) {
        try {
            const response = await addStats({variables: { makes: 20, misses: 10,shotType: "layup", x: 100, y: 200, currentLocation: 100}});
            console.log(response)

        } catch (err) {
            console.log(err);
            
        }

    }

    //Add point
    useEffect(() => {
        //STILL NEED TO DO: Push pin data to array and array to database with fetch request
        //Initiate Canvas
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = playerInnerColor;

        ctx.beginPath()
        xPos && yPos ? ctx.arc(xPos, yPos, 10, 0, 2*Math.PI) : ctx.arc(xPos, yPos, 0, 0, 2*Math.PI)
        ctx.fill();
     
        // newPin(xPos, yPos);
        console.log('x: ',xPos,'y: ',yPos);
    }, [pinnedLocationCount]);

    //Court Lines Start
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.width;
        let height = canvas.height;
        let courtLinesWidth = width*height*.000013;
        let center = width/2;
        let half = height/2;
        ctx.strokeStyle = courtLineColor

        ctx.lineWidth = (courtLinesWidth)

            //Draw Half Court
        function drawHalf() {
            let halfCourtX = width/2
            let halfCourtY = height/2
            let bigCircleWidth = width*.15
            let smallCircleWidth = width *.05
            ctx.fillStyle = courtLineColor;

            //horizontal line
            ctx.beginPath()
            ctx.moveTo(0, halfCourtY);
            ctx.lineTo(width, halfCourtY);
            
            //circle small
            ctx.arc(center, halfCourtY, smallCircleWidth, 0, 2*Math.PI);
            ctx.stroke();
            //circle big
            ctx.arc(center, halfCourtY, bigCircleWidth, 0, 2*Math.PI);
            ctx.stroke();
            return(
                {
                    x: halfCourtX,
                    y: halfCourtY,
                    bigCircleWidth: bigCircleWidth,
                    smallCircleWidth: smallCircleWidth
                }
            )
            } drawHalf();
            //Draw 3 Point Line
            function drawThreePointLine() {
                    //center+with & center-width = x values for 2 lines
                
                let y;
                let distanceFromHalf = height/5.5
                let r = width/2.5
                let distanceBetweenLines = center*2
                    for(let x=0; x<=width/2; x+=.5) {
                      //Draw half circle
                    ctx.beginPath()
                    let y= .9*Math.sqrt((r*r)-x*x)+distanceFromHalf
                    ctx.arc(x+center, y-60, courtLinesWidth/2.2, 0, 2*Math.PI);
                    ctx.arc(-x+center, y-60, courtLinesWidth/2.2, 0, 2*Math.PI);
                    ctx.fill();
                
                    }
             
                    let rx = center+r
                    y= .02655*Math.sqrt(r*r)

                    ctx.beginPath()
                    ctx.moveTo(rx, 0);
                    ctx.lineTo(rx, y+distanceFromHalf-45);
                    ctx.stroke();

                    let lx = center-width/2.5
                    ctx.beginPath()
                    ctx.moveTo(lx, 0);
                    ctx.lineTo(lx, y+distanceFromHalf-45);
                    ctx.stroke();
                    

                    return({
                        rightX: rx,
                        leftX: lx,
                        height: y+distanceFromHalf
                    })

            } drawThreePointLine();
            //Draw Free Throw
            function drawFreeThrow() {
            
            let height = drawThreePointLine().height;
            
            //Start at 
                let y;
                let r = width/7
                for(let x=0; x<=width/5; x+=.5) {
               //Draw half circle
                  ctx.beginPath()
                  y= Math.sqrt((r*r)-x*x)+height*.93
                  ctx.arc(x+center, y, courtLinesWidth/2.2, 0, 2*Math.PI);
                  ctx.arc(-x+center, y, courtLinesWidth/2.2, 0, 2*Math.PI);
                  ctx.fill();
              
                  }
                  //right
                    let x = center+r
                    let xOne = x
                    y= .02655*Math.sqrt(r*r)*2
                   
                    //left
                    x = center-r
                    let distance = xOne - x+20;
                    
                    //draw paint
                    ctx.beginPath();
                    ctx.rect(x-10, 0, distance, height)
                    ctx.strokeStyle = courtLineColor;
                    ctx.fillStyle = paintColor;
                    ctx.fill();
                    ctx.stroke();

                    //left small horizontal lines
                    //1
                    ctx.beginPath();
                    ctx.moveTo(x-10,height-25);
                    ctx.lineTo(x-20, height-25);
                    ctx.stroke();
                    //2
                    ctx.beginPath();
                    ctx.moveTo(x-10,height-50);
                    ctx.lineTo(x-20, height-50);
                    ctx.stroke();
                    //3
                    ctx.beginPath();
                    ctx.moveTo(x-10,height-75);
                    ctx.lineTo(x-20, height-75);
                    ctx.stroke();
                    //4
                    ctx.beginPath();
                    ctx.moveTo(x-10,height-85);
                    ctx.lineTo(x-20, height-85);
                    ctx.stroke();

                    //-1
                    ctx.beginPath();
                    ctx.moveTo(xOne+10,height-25);
                    ctx.lineTo(xOne+20, height-25);
                    ctx.stroke();
                    //-2
                    ctx.beginPath();
                    ctx.moveTo(xOne+10,height-50);
                    ctx.lineTo(xOne+20, height-50);
                    ctx.stroke();
                    //-3
                    ctx.beginPath();
                    ctx.moveTo(xOne+10,height-75);
                    ctx.lineTo(xOne+20, height-75);
                    ctx.stroke();
                    //-4
                    ctx.beginPath();
                    ctx.moveTo(xOne+10,height-85);
                    ctx.lineTo(xOne+20, height-85);
                    ctx.stroke();

                    //draw left line
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.stroke();

                    //draw right line
                    x = center+r
                    ctx.beginPath()
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.stroke();
                    

                    // for(let x=0; x<=width/2; x+=.5) {
                    //     //Draw half circle
                    //        ctx.fillStyle = courtLineColor;
                    //        ctx.beginPath()
                    //        y= -Math.sqrt((r*r)-x*x)+height*.93
                    //        ctx.arc(x+center, y+5, courtLinesWidth/2.2, 0, 2*Math.PI);
                    //        ctx.arc(-x+center, y+5, courtLinesWidth/2.2, 0, 2*Math.PI);
                    //        ctx.fill();
                       
                    //        }
                    ctx.setLineDash([5, 15]);
                    ctx.beginPath();
                    ctx.arc(center, height-9, r, 0, Math.PI, -1);
                    ctx.stroke();
                    ctx.setLineDash([]);
            } drawFreeThrow();

            function drawOutOfBounds() {
                ctx.lineWidth = courtLinesWidth*3
                ctx.beginPath();
                
                ctx.rect(0,0,width,height)
                ctx.stroke();
                
            } drawOutOfBounds();
    }, []) //Add use effect when screen size variables change [screen size variable]
    



    const [statName, setStatName] = useState('');
    const [makes, setMakes] = useState(0);
    const [misses, setMisses] = useState(0);

    return(<>
        {loading ? <div>loading</div> : ''}
        <canvas 
        ref={canvasRef} 
        width={canvasWidth} 
        height={window.innerHeight-334}
        onClick={() => {
            pinnedLocationCount++
        }
    }
        ></canvas>
         <form onSubmit={newPin} className="login">
                Name this point: <input type="text" id='statName' name='statName'
                value={statName} onChange={(e) => setStatName(e.target.value)}/>
                Makes: <input type="text" id='makes' name='makes'
                value={makes} onChange={(e) => setMakes(e.target.value)}/>
                Misses: <input type="text" id='misses' name='misses'
                value={misses} onChange={(e) => setMisses(e.target.value)}/>
                <button type="submit">Add Stats</button>
        </form>
    </>)
} //Court Lines End

export default Court;