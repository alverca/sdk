/**
 * 注文取引サンプル
 */
const httpStatus = require('http-status');
const moment = require('moment');
const alvercaapi = require('../lib/index');

const auth = new alvercaapi.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: [],
    state: 'teststate'
});

const alvercaService = new alvercaapi.service.SalesReport({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const day = moment()
        .add(30, 'day')
        .format('YYYYMMDD');

    let searchPerformancesResult = await alvercaService.fetch({
        uri: '/performances',
        method: 'GET',
        qs: { day: day },
        expectedStatusCodes: [httpStatus.OK]
    })
        .then(async (response) => {
            return {
                data: await response.json()
            };
        });
    console.log('performances found', searchPerformancesResult.data.data.length);
    const performances = searchPerformancesResult.data.data;
    console.log(performances);

    let performance = performances.find((p) => p.attributes.seat_status > 0);
    if (performance === undefined) {
        throw new Error('予約可能なパフォーマンスが見つかりません。');
    }

    console.log('パフォーマンスを決めています...');
    searchPerformancesResult = await alvercaService.fetch({
        uri: '/performances',
        method: 'GET',
        qs: { performanceId: performance.id },
        expectedStatusCodes: [httpStatus.OK]
    })
        .then(async (response) => {
            return {
                data: await response.json()
            };
        });
    performance = searchPerformancesResult.data.data[0];
    await wait(1000);
    console.log('取引を開始します... パフォーマンス:', performance.id);

    // 取引開始
    const transaction = await alvercaService.fetch({
        uri: '/transactions/placeOrder/start',
        method: 'POST',
        body: {
            expires: moment()
                .add(10, 'minutes')
                .toISOString(),
        },
        expectedStatusCodes: [httpStatus.CREATED]
    })
        .then(async (response) => response.json());
    console.log('取引が開始されました。', transaction);

    // 仮予約
    console.log('券種を選択しています...', performance.attributes.ticket_types.map((t) => t.id));

    await wait(1000);
    let ticketType = performance.attributes.ticket_types.find((t) => t.id === '001');
    let seatReservationAuthorizeAction = await alvercaService.fetch({
        uri: `/transactions/placeOrder/${transaction.id}/actions/authorize/seatReservation`,
        method: 'POST',
        body: {
            performance_id: performance.id,
            offers: [{
                ticket_type: ticketType.id,
                watcher_name: 'サンプルメモ'
            }]
        },
        expectedStatusCodes: [httpStatus.CREATED]
    })
        .then(async (response) => response.json());
    console.log('仮予約が作成されました。', seatReservationAuthorizeAction.id);

    console.log('券種を変更しています...');
    await wait(1000);
    // 仮予約削除
    await alvercaService.fetch({
        uri: `/transactions/placeOrder/${transaction.id}/actions/authorize/seatReservation/${seatReservationAuthorizeAction.id}`,
        method: 'DELETE',
        body: {
            performance_id: performance.id,
            offers: [{
                ticket_type: ticketType.id,
                watcher_name: 'サンプルメモ'
            }]
        },
        expectedStatusCodes: [httpStatus.NO_CONTENT]
    });
    console.log('仮予約が削除されました。');

    // 再仮予約
    // ticketType = performance.attributes.ticket_types[0];
    seatReservationAuthorizeAction = await alvercaService.fetch({
        uri: `/transactions/placeOrder/${transaction.id}/actions/authorize/seatReservation`,
        method: 'POST',
        body: {
            performance_id: performance.id,
            offers: [{
                ticket_type: ticketType.id,
                watcher_name: 'サンプルメモ'
            }]
        },
        expectedStatusCodes: [httpStatus.CREATED]
    })
        .then(async (response) => response.json());
    console.log('仮予約が作成されました。', seatReservationAuthorizeAction.id);

    // 購入者情報登録
    console.log('購入者情報を入力しています...');
    await wait(1000);
    let customerContact = {
        last_name: 'POSせい',
        first_name: 'POSめい',
        email: 'hello@motionpicture.jp',
        tel: '+819012345678',
        gender: '0'
    };
    customerContact = await alvercaService.fetch({
        uri: `/transactions/placeOrder/${transaction.id}/customerContact`,
        method: 'PUT',
        body: customerContact,
        expectedStatusCodes: [httpStatus.CREATED]
    })
        .then(async (response) => response.json());
    console.log('購入者情報が登録されました。', customerContact.tel);

    // 確定
    console.log('最終確認しています...');
    await wait(1000);
    const transactionResult = await alvercaService.fetch({
        uri: `/transactions/placeOrder/${transaction.id}/confirm`,
        method: 'POST',
        body: {},
        expectedStatusCodes: [httpStatus.CREATED]
    })
        .then(async (response) => response.json());
    console.log('取引確定です。', transactionResult.eventReservations[0].payment_no);

    await wait(3000);

    // すぐに注文返品
    console.log('返品しています...');
    await alvercaService.fetch({
        uri: `/transactions/returnOrder/confirm`,
        method: 'POST',
        body: {
            performance_day: day,
            payment_no: transactionResult.eventReservations[0].payment_no
        },
        expectedStatusCodes: [httpStatus.CREATED]
    })
        .then(async (response) => response.json());
    console.log('返品しました');
}

async function wait(waitInMilliseconds) {
    return new Promise((resolve) => setTimeout(resolve, waitInMilliseconds));
}

main().then(() => {
    console.log('main processed.');
}).catch((err) => {
    console.error(err);
});
