# ひざの自主トレノート

セラピスト向けの変形性膝関節症 自主トレシート作成ツール。依存パッケージ不要の HTML / CSS / JavaScript で動作します。

詳細な機能・画面・出力仕様と確認状況は [仕様書](仕様書.md) を参照してください。

## 使い方

dist/index.html をブラウザで開きます。または dist を静的配信します。
5種目から検索・部位別フィルターで最大4種目を選び、「内容を調整」で回数・セット数を変更します。右側の常時プレビューを確認して「PDF出力・印刷」を選びます。必要に応じて「拡大して確認」も使用できます。
ブラウザの印刷画面で A4縦、倍率100%、ヘッダー・フッターなしを選び、「PDFに保存」で出力します。
氏名欄は手書き用の空欄です。サーバー送信・永続保存はありません。

## 医療内容

運動療法全般の推奨と、個別種目の実施例を区別しています。初期値10回×1セットは調整用の目安であり、ガイドラインで確立された一律の処方ではありません。
適応、実施頻度、運動負荷は患者の状態に合わせて担当セラピストが判断します。

- NICE NG226 (2022): https://www.nice.org.uk/guidance/NG226/chapter/recommendations
- AAOS 第3版 (2021): https://www.aaos.org/oak3cpg
- NHS Fife: https://www.nhsfife.org/services/all-services/patient-advice/knee-osteoarthritis-management-and-rehabilitation/
- Royal Orthopaedic Hospital: https://roh.nhs.uk/services-information/therapy/exercises-for-osteoarthritis-of-the-knee

参考文献確認日: 2026-11-02

イラストは built-in image_gen で新規生成。プロンプトは IMAGE_PROMPTS.md に記録しています。
