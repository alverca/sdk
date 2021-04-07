# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

### Added

- 決済レポートサービスを追加

### Changed

### Deprecated

### Removed

### Fixed

### Security

## v10.0.0 - 2021-02-01

### Changed

- @alverca/sdkとして再リリース

### Removed

- パフォーマンスサービスを削除

## v9.3.0 - 2021-01-20

### Changed

- GET /eventsをGET /performancesへ移行

## v9.2.1 - 2021-01-19

### Changed

- update @tokyotower/factory

## v9.2.0 - 2021-01-14

### Added

- 売上レポート検索を追加

## v9.1.0 - 2021-01-12

### Changed

- サービスインスタンスに対してプロジェクトを指定できるように調整

## v9.0.1 - 2021-01-10

### Changed

- update @tokyotower/factory

## v9.0.0 - 2021-01-08

### Removed

- 予約サービスを削除

## v8.0.3 - 2021-01-04

### Changed

- update @tokyotower/factory

## v8.0.2 - 2020-12-26

### Changed

- update @tokyotower/factory

## v8.0.1 - 2020-12-19

### Changed

- update @tokyotower/factory

## v8.0.0 - 2020-10-26

### Changed

- update @tokyotower/factory

### Removed

- タスクサービスを削除

## v7.5.0 - 2020-08-13

### Changed

- update @tokyotower/factory

## v7.4.0 - 2020-08-12

### Changed

- update @tokyotower/factory

## v7.3.0 - 2020-08-07

### Added

- 予約管理用のイベント検索を追加

## v7.2.1 - 2020-07-28

### Changed

- update @tokyotower/factory

## v7.2.0 - 2020-07-28

### Changed

- update @tokyotower/factory

## v7.1.0 - 2020-07-23

### Changed

- update @tokyotower/factory

## v7.0.0 - 2020-06-14

### Removed

- 管理者サービスを削除

## v6.4.0 - 2020-06-08

### Added

- OAuth2認証クライアントにverifyIdTokenを追加

## v6.3.0 - 2020-06-03

### Changed

- update @tokyotower/factory

## v6.2.0 - 2020-03-11

### Added

- 注文番号での予約検索エンドポイントを追加

## v6.1.0 - 2020-03-08

### Changed

- update @chevre/factory

## v6.0.0 - 2020-02-16

### Removed

- 購入番号発行を削除
- 券種カテゴリーレート制限サービスを削除

## v5.3.0 - 2019-12-03

### Added

- 券種カテゴリーレート制限サービスを追加

## v5.2.0 - 2019-11-20

### Changed

- update @tokyotower/factory

## v5.1.0 - 2019-11-12

### Added

- 購入番号発行サービスを追加

## v5.0.0 - 2019-11-08

### Removed

- 印刷トークン発行サービスを削除

## v4.2.0 - 2019-10-25

### Changed

- update @tokyotower/factory

## v4.1.0 - 2019-10-24

### Changed

- update @tokyotower/factory

## v4.0.0 - 2019-10-16

### Removed

- 注文取引サービスを削除(Cinerino移行)
- 注文返品取引サービスを削除(Cinerino移行)
- 注文サービスを削除(Cinerino移行)
- 組織サービスを削除

## v3.0.0 - 2019-10-11

### Changed

- 注文返品タスクをCinerino化
- 注文返品取引インターフェースをCinerino化

## v2.0.0 - 2019-10-07

### Changed

- 決済方法タイプをCinerino化
- 座席予約承認結果をCinerino化
- 座席予約承認結果からtmpReservationsを削除

## v1.3.1 - 2019-09-24

### Changed

- 注文取引確定レスポンスの型を調整

## v1.3.0 - 2019-09-24

### Changed

- update @tokyotower/factory

## v1.2.1 - 2019-08-06

### Changed

- update @tokyotower/factory

## v1.2.0 - 2019-07-31

### Changed

- update @tokyotower/factory

## v1.1.0 - 2019-07-29

### Added

- 売上集計ストリーミング検索を追加

## v1.0.1 - 2019-07-19

### Changed

- install @tokyotower/factory

## v1.0.0 - 2019-07-12

### Added

- タスクサービスを追加
- 注文取引検索を追加
- パフォーマンス拡張属性更新を追加
- 注文検索を追加
- 予約キャンセルを追加
- 予約印刷トークン発行を追加

### Changed

- update ttts-factory.
- パフォーマンスインターフェースをChevre化に向けて補強
- 予約検索条件を拡張
- 予約の入場以外の全属性をChevre化
- 券種インターフェースをChevre化
- パフォーマンス検索条件のChevre化

### Removed

- 券種からキャンセルチャージ属性を削除
- 注文取引結果からeventReservationsを削除(order.acceptedOffersへ移行)
- 仮予約インターフェースからrate_limit_unit_in_secondsを削除
- パフォーマンスインターフェースから非推奨属性を削除

## v0.0.2 - 2018-02-01
### Fixed
- 購入者情報登録のリクエストから国コードが除外されるバグを修正。

## v0.0.1 - 2018-01-21
### Fixed
- 管理者検索レスポンスの型を修正。

## v0.0.0 - 2018-01-17
### Added
- クライアント認証クライントを追加。
- OAuth2認証クライアントを追加。
