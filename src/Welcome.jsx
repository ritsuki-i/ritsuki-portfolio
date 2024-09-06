import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FaReact } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { AiOutlineBranches } from "react-icons/ai";
import { VscJson } from "react-icons/vsc";


const Welcome = () => {
    const [isVisible, setIsVisible] = useState(sessionStorage.getItem('isVisible') || true); // 状態を管理
    const [fadeOut, setFadeOut] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCompiledSuccess, setIsCompiledSuccess] = useState(false);

    useEffect(() => {
        const savedVisibility = sessionStorage.getItem('isVisible');
        console.log('isVisible:', isVisible);
    
        if (savedVisibility !== null) {
            setIsVisible(JSON.parse(savedVisibility)); // sessionStorageから取得した値でisVisibleを設定
        }
        
        setIsLoaded(true); // sessionStorageからの読み込みが完了
    }, []);
    
    useEffect(() => {
        if (isLoaded && isVisible) {
            document.body.style.overflow = 'hidden'; // ロード完了後に評価
        }
    }, [isLoaded, isVisible]);
    
    const handleClick = () => {
        //操作ロックを解除
        document.body.style.overflow = '';
        // 0.5秒後に要素を非表示にする
        setTimeout(() => {
            // フェードアウトを開始
            setFadeOut(true);   
            setIsVisible(false);
            sessionStorage.setItem('isVisible', false);
        }, 500); 
    };

    const handleStart = () => {
        setIsStart(true);
    }

    const handleCompiledSuccess = () => {
        setIsCompiledSuccess(true);
    }

    if (!isLoaded) {
        return null; // 読み込みが終わるまで何もレンダリングしない
    }

    return (
        <>
            {isVisible && (
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'black',
                        position: 'absolute',
                        zIndex: '8',
                        top: '0',
                        opacity: fadeOut ? 0 : 1,
                        transition: 'opacity 0.5s ease-out',
                        fontFamily: 'cursive'
                    }}
                >
                    <ul style={{ color: 'white', listStyle: 'none', display: 'flex', border: '1px solid white', marginTop: '0', marginBottom: '0', padding: '5px 0' }}>
                        <li style={{ paddingLeft: '10px' }}>ファイル(F)</li>
                        <li style={{ paddingLeft: '10px' }}>編集(E)</li>
                        <li style={{ paddingLeft: '10px' }}>選択(S)</li>
                        <li style={{ paddingLeft: '10px' }}>表示(V)</li>
                        <li style={{ paddingLeft: '10px' }}>移動(G)</li>
                        <li style={{ paddingLeft: '10px' }}>・・・</li>
                        <li style={{
                            border: '1px solid white',
                            width: '40vw',
                            marginLeft: '20px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(103, 103, 103)'
                        }}>
                            <SearchIcon style={{ marginRight: '8px' }} />
                            <span>ritsuki-portfolio</span>
                        </li>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                            <li style={{ color: 'white', display: 'flex', alignItems: 'center', paddingRight: '25px' }}><RemoveIcon style={{ fontSize: '20px' }} /></li>
                            <li style={{ color: 'white', transform: 'rotate(180deg)', display: 'flex', alignItems: 'center', paddingLeft: '25px' }}><FilterNoneIcon style={{ fontSize: '20px' }} /></li>
                            <li style={{ color: 'white', display: 'flex', alignItems: 'center', paddingRight: '10px' }}><CloseIcon style={{ fontSize: '20px' }} /></li>
                        </div>
                    </ul>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '10vw', height: '100vw', border: '1px solid white', borderTop: '0px', fontSize: 'small' }}>
                            <ul style={{
                                color: 'white',
                                listStyle: 'none',
                                display: 'flex',
                                justifyContent: 'space-evenly',  // 横幅を均等に分配
                                alignItems: 'center',            // 縦幅を均等に揃える
                                borderBottom: '1px solid white',
                                marginTop: '0',
                                marginBottom: '0',
                                padding: '5px 0'
                            }}>
                                <li><ImFilesEmpty style={{ fontSize: '24px' }} /></li>
                                <li><SearchIcon style={{ fontSize: '24px' }} /></li>
                                <li><AiOutlineBranches style={{ fontSize: '24px' }} /></li>
                                <li><ExpandMoreIcon style={{ fontSize: '24px' }} /></li>
                            </ul>

                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center' }}>
                                <ExpandMoreIcon sx={{ fontSize: 'small' }} /> Users
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
                                <ExpandMoreIcon sx={{ fontSize: 'small' }} /> Desktop
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '16px' }}>
                                <ExpandMoreIcon sx={{ fontSize: 'small' }} /> ritsuki-portfolio
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                <FaReact style={{ color: '#59d3ff' }} />About.jsx
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                <FaReact style={{ color: '#59d3ff' }} />Application.jsx
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                <FaReact style={{ color: '#59d3ff' }} />Contact.jsx
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                <FaReact style={{ color: '#59d3ff' }} />Home.jsx
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '24px', backgroundColor: 'rgb(103, 103, 103, 10)' }}>
                                <FaReact style={{ color: '#59d3ff' }} />Welcome.jsx
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                <VscJson style={{ color: '#ffdd00' }} />UsedTec.json
                            </p>
                            <p style={{ color: 'white', margin: '0', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                <NavigateNextIcon sx={{ fontSize: 'small' }} />css
                            </p>
                        </div>
                        <div style={{ width: '90vw' }}>
                            <ul style={{
                                height: '40px',
                                color: 'white',
                                listStyle: 'none',
                                display: 'flex',
                                borderBottom: '1px solid white',
                                marginTop: '0',
                                marginBottom: '0',
                                padding: '0',
                                backgroundColor: 'black'
                            }}>
                                <li style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid white', padding: '5px 10px', backgroundColor: 'rgb(103, 103, 103, 10)' }}><FaReact style={{ color: '#59d3ff' }} />Welcome.jsx U<CloseIcon style={{ fontSize: '18px', paddingLeft: '5px' }} /></li>
                                <li style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid white', padding: '5px 10px' }}><VscJson style={{ color: '#ffdd00' }} />UsedTec.json</li>
                            </ul>
                            <p style={{ borderBottom: '1px solid white', color: 'white', margin: '0', fontSize: 'small', paddingLeft: '10px', backgroundColor: 'black' }}>Users &gt; Desktop &gt; ritsuki-portfolio &gt; <FaReact style={{ color: '#59d3ff' }} />Welcome.jsx</p>
                            <div style={{ overflow: 'hidden', position: 'relative' }}>
                                <table style={{ color: 'white', transform: 'translateY(-40px)', paddingLeft: '10px' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>84</td>
                                            <td style={{ paddingLeft: '30px' }}><span style={{ color: '#ff8df2' }}>&#x7d;</span><span style={{ color: '#ffdd00' }}>&#x29;</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>85</td>
                                            <td style={{ paddingLeft: '30px' }}>scene.add<span style={{ color: '#ffdd00' }}>(</span>earthContainer<span style={{ color: '#ffdd00' }}>)</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>86</td>
                                            <td style={{ paddingLeft: '30px' }}></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>87</td>
                                            <td style={{ paddingLeft: '30px' }}><span style={{ color: '#59d3ff' }}>const</span> directionalLight = <span style={{ color: '#59d3ff' }}>new</span> THREE.<span style={{ color: '#03c800' }}>DirectionalLight</span><span style={{ color: '#ffdd00' }}>(<span style={{ color: '#c1ffdb' }}>0xffffff</span>)</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>88</td>
                                            <td style={{ paddingLeft: '30px' }}>directionalLight.position.set<span style={{ color: '#ffdd00' }}>(<span style={{ color: '#c1ffdb' }}>1, 1, 1</span>)</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>89</td>
                                            <td style={{ paddingLeft: '30px' }}>scene.add<span style={{ color: '#ffdd00' }}>(</span>directionalLight<span style={{ color: '#ffdd00' }}>)</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>90</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>91</td>
                                            <td style={{ paddingLeft: '30px' }}><span style={{ color: '#59d3ff' }}>const</span> onWindowResize = <span style={{ color: '#ffdd00' }}>()</span> <span style={{ color: '#59d3ff' }}>=&gt;</span> <span style={{ color: '#ffdd00' }}>&#x7b;</span></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>92</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;<span style={{ color: '#59d3ff' }}>const</span> newWidth = window.innerWidth;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>93</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;<span style={{ color: '#59d3ff' }}>const</span> newHeight = window.innerHeight - <span style={{ color: '#c1ffdb' }}>200</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>94</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>95</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;renderer.setSize<span style={{ color: '#ff8df2' }}>(</span>newWidth, newHeight<span style={{ color: '#ff8df2' }}>)</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>96</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;camera.aspect = newWidth / newHeight;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>97</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;camera.updateProjectionMatrix<span style={{ color: '#ff8df2' }}>()</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>98</td>
                                            <td style={{ paddingLeft: '30px' }}><span style={{ color: '#ffdd00' }}>&#x7d;</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>99</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>100</td>
                                            <td style={{ paddingLeft: '30px' }}>window.addEventListener<span style={{ color: '#ff8df2' }}>(</span><span style={{ color: '#ff974d' }}>"resize"</span>, onWindowResize<span style={{ color: '#ff8df2' }}>)</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>101</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>102</td>
                                            <td style={{ paddingLeft: '30px' }}>document.addEventListener<span style={{ color: '#ff8df2' }}>&#x28;</span><span style={{ color: '#ff974d' }}>"mousemove"</span>, <span style={{ color: '#ff8df2' }}>(</span><span style={{ color: '#bababa' }}>event</span><span style={{ color: '#ff8df2' }}>)</span> <span style={{ color: '#59d3ff' }}>=&gt;</span> <span style={{ color: '#ff8df2' }}>&#x7b;</span></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>103</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;mouseX = <span style={{ color: '#bababa' }}>event</span>.pageX;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>104</td>
                                            <td style={{ paddingLeft: '30px' }}><span style={{ color: '#ff8df2' }}>&#x7d;</span><span style={{ color: '#ffdd00' }}>&#x29;</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>105</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>106</td>
                                            <td style={{ paddingLeft: '30px' }}><span style={{ color: '#59d3ff' }}>const</span> tick = <span style={{ color: '#ffdd00' }}>()</span> <span style={{ color: '#59d3ff' }}>=&gt;</span> <span style={{ color: '#ffdd00' }}>&#x7b;</span></td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>107</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;<span style={{ color: '#59d3ff' }}>const</span> targetRot = <span style={{ color: '#ff8df2' }}>(</span>mouseX / window.innerWidth<span style={{ color: '#ff8df2' }}>)</span> * <span style={{ color: '#c1ffdb' }}>360</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>108</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;rot += <span style={{ color: '#ff8df2' }}>(</span>targetRot - rot<span style={{ color: '#ff8df2' }}>)</span> * <span style={{ color: '#c1ffdb' }}>0.02</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>109</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;rot2 += <span style={{ color: '#c1ffdb' }}>0.1</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>110</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;<span style={{ color: '#59d3ff' }}>const</span> radian = <span style={{ color: '#ff8df2' }}>(</span><span style={{ color: '#59d3ff' }}>(</span>rot + rot2<span style={{ color: '#59d3ff' }}>)</span> * Math.PI<span style={{ color: '#ff8df2' }}>)</span> / <span style={{ color: '#c1ffdb' }}>180</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>111</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;camera.position.x = <span style={{ color: '#c1ffdb' }}>1000</span> * Math.sin<span style={{ color: '#ff8df2' }}>(</span>radian<span style={{ color: '#ff8df2' }}>)</span>;</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'right', color: '#59d3ff' }}>112</td>
                                            <td style={{ paddingLeft: '30px' }}>&emsp;camera.position.z = <span style={{ color: '#c1ffdb' }}>1000</span> * Math.cos<span style={{ color: '#ff8df2' }}>(</span>radian<span style={{ color: '#ff8df2' }}>)</span>;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ position: 'absolute', bottom: '0', borderTop: '1px solid white', height: '50vh', width: '100%', zIndex: '9', backgroundColor: 'black' }}>
                                <ul style={{
                                    height: '40px',
                                    color: 'white',
                                    listStyle: 'none',
                                    display: 'flex',
                                    marginTop: '0',
                                    marginBottom: '0',
                                    padding: '0',
                                    fontSize: 'small'
                                }}>
                                    <li style={{ padding: '0 20px', lineHeight: '40px' }}>問題</li>
                                    <li style={{ padding: '0 20px', lineHeight: '40px' }}>出力</li>
                                    <li style={{ padding: '0 20px', lineHeight: '40px' }}>デバッグコンソール</li>
                                    <li style={{ padding: '0 20px', lineHeight: '40px', borderBottom: '1px solid white' }}>ターミナル</li> {/* アンダーラインを追加 */}
                                    <li style={{ padding: '0 20px', lineHeight: '40px' }}>ポート</li>
                                </ul>
                                {!isCompiledSuccess && (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', color: 'white', paddingLeft: '10px' }}>
                                            <p style={{ margin: 0, paddingRight: '10px' }}>
                                                <span style={{ fontSize: 'small' }}>○</span> PS C:\Users\Desktop\ritsuki-portfolio&gt;
                                            </p>
                                            <TypeAnimation
                                                sequence={[`npm start`, 1000, () => handleStart()]}
                                                speed={10}
                                                wrapper="span"
                                                cursor={true}
                                                repeat={1}
                                                omitDeletionAnimation={true}
                                                style={{ whiteSpace: 'pre-line', fontSize: '1em', display: 'inline-block', color: 'rgb(0, 213, 32)' }}
                                            />
                                        </div>
                                        {isStart && (
                                            <>
                                                <div style={{ color: 'white', margin: '30px' }}>
                                                    <p style={{ margin: '0' }}>&gt; ritsuki-portfolio@0.1.0 start</p>
                                                    <p style={{ margin: '0' }}>&gt; react-script start</p>
                                                </div>
                                                <div style={{ color: '#59d3ff', margin: '30px' }}>
                                                    <TypeAnimation
                                                        sequence={[`Starting the development server...`, 1000, () => handleCompiledSuccess()]}
                                                        speed={10}
                                                        wrapper="span"
                                                        cursor={true}
                                                        repeat={1}
                                                        omitDeletionAnimation={true}
                                                        style={{ whiteSpace: 'pre-line', fontSize: '1em', display: 'inline-block' }}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                                {isCompiledSuccess && (
                                    <div style={{ color: 'white', margin: '30px', marginTop: '10px' }}>
                                        <TypeAnimation
                                            sequence={[
                                                `Compiled successfully!

                                                You can now view ritsuki-portfolio in the browser.

                                                Local: http://localhost:3000/ritsuki-portfolio
                                                On Your Network: http://192.168.1.21:3000/ritsuki-portfolio
                                                
                                                Note that the development build is not optimized.
                                                To create a production build, use npm run build.

                                                webpack compiled successfully
                                                `, 1000, () => handleClick()
                                            ]}
                                            speed={100}
                                            wrapper="span"
                                            cursor={true}
                                            repeat={1}
                                            omitDeletionAnimation={true}
                                            style={{ whiteSpace: 'pre-line', fontSize: '1em', display: 'inline-block' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <br />
                    </div>
                </div >
            )}
        </>
    );
}

export default Welcome;
