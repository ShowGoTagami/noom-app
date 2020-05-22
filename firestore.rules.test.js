// エミュレータホストの指定。デフォルトポートでエミュレータを起動した場合は不要
process.env.FIRESTORE_EMULATOR_HOST = "localhost:58080";

const fs = require("fs");
const firebase = require("@firebase/testing");

// 認証なしFirestoreクライアントの取得
function getFirestore() {
    const app = firebase.initializeTestApp({
        projectId: "noom-app"
    });

    return app.firestore();
}

describe("fruitsコレクションへの認証付きでのアクセスのみを許可", () => {
    beforeEach(async () => {
        // セキュリティルールの読み込み
        await firebase.loadFirestoreRules({
            projectId: "noom-app",
            rules: fs.readFileSync("firestore.rules", "utf8")
        });
    });

    afterEach(async () => {
        await Promise.all(firebase.apps().map(app => app.delete()))
    });

    describe('rooms', () => {
        test('roomsが生成できること', async () => {
            const db = getFirestore();
            const batch = db.batch();
            await firebase.assertSucceeds(batch.set(db.collection("rooms").doc('uuid'), {
                ownerId: 'ownerId',
            }));
        });

        test('認証なしでの取得に失敗', async () => {
            const db = getFirestore();
            const doc = db.collection('fruits').doc('strawberry');
            await firebase.assertFails(doc.get())
        });
    });

    describe('messages', () => {
        test('認証なしでのデータ保存に失敗', async () => {
            const db = getFirestore();
            const doc = db.collection('countries').doc('japan');
            await firebase.assertFails(doc.set({language: 'japanese'}))
        });

        test('認証なしでの取得に失敗', async () => {
            const db = getFirestore();
            const doc = db.collection('vehicles').doc('car');
            await firebase.assertFails(doc.get())
        });
    });
});
