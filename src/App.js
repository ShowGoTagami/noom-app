import React, { Fragment } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { db } from './Firebase';

export const App = () => {

  const generaeteRoom = () => {
    db.collection("rooms").doc().set({
      ownerId: 1001,
    });
    console.log('おわった!')
  };

  const addMessages = () => {
    const date = new Date();
    const currentTime = date.getTime();

    db.collection("rooms").doc('6dQYcmgwhf3Zn0gs60pv').collection('messages').doc().set({
      body: '今日何してる？',
      createdAt: currentTime,
    })
    db.collection("rooms").doc('6dQYcmgwhf3Zn0gs60pv').collection('messages').doc().set({
      body: '話したいことがあるんだけど...',
      createdAt: currentTime,
    })
    console.log('投稿しました！')
  }

  const ShowRoomId = ({ originalProp }) => {
    const { uuidHash } = useParams();
    return (
      <div>
        <p>{originalProp} {uuidHash}だよ</p>
      </div>
    );
  };

  const ShowOwnerId = ({ subText }) => {
    const { ownerId } = useParams();
    return (
      <div>
        <p>{subText} {ownerId}だよ！</p>
      </div>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rooms/hogehogeHash">メンバーroom</Link>
              </li>
              <li>
                <Link to="/rooms/hogehogeHash/owner/10001">オーナーroom</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/rooms/:uuidHash">
              <ShowRoomId originalProp="メンバー専用ページのUUID_HASHは" />
            </Route>
            <Route exact path="/rooms/:uuidHash/owner/:ownerId">
              <ShowRoomId originalProp="オーナー専用ページのUUID_HASHは" />
              <ShowOwnerId subText="オーナーIDは" />
            </Route>
            <Route path="/">
              <button onClick={() => generaeteRoom()}>部屋を作る</button>
              <button onClick={() => addMessages()}>ランダムメッセージを送る</button>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};
