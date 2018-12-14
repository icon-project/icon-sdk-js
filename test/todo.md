# 개요
JS, python sdk의 테스트 코드를 살펴, JS에 어떠한 코드를 적을지 리스트업하기 위한 문서.


# JAVA

## Data - Address
1. hx, cx가 붙은 주소가 isValidAddress 통과하는지 검증
2. hx 주소가 붙은 주소가 isContractAddress에 들어갔을시 에러가 일어나는지 검증
3. 프리픽스 없는 경우, 스트링 길이가 부족할 경우, 헥사가 아닐 경우, 대문자가 섞여있을 경우를 전부 검증.

## Data - iconAmountTest
1. 임의의 숫자로 BigInteger 정의하고, 단위가 맞는지 검증.
2. 타입 변환 함수들 검증
3. 단위 변환 함수들 검증
4. TODO: 16 이 부분은 체크해 봐야함
```java
amount = IconAmount.of(new BigInteger("1000000000000000000"), 16);
        assertEquals(new BigInteger("1000000000000000000"), amount.asInteger());
        assertEquals(16, amount.getDigit());
```

## CallTest

1. 콜 선언하고, 람다 형식으로 함수 다 선언한뒤, 각 패러미터들 검증하는 방식.
```java
Assertions.assertEquals(from, properties.getItem("from").asAddress());
        Assertions.assertEquals(to, properties.getItem("to").asAddress());
        Assertions.assertEquals(method, data.getItem("method").asString());
        Assertions.assertEquals(person.name, dataParams.getItem("name").asString());
        Assertions.assertEquals(person.age, dataParams.getItem("age").asInteger());
        Assertions.assertEquals(PersonResponse.class, call.responseType());
```

## IconServiceTest
아이콘 서비스 함수 작동 자체를 테스트.
1. Iconservice 선언 테스트 (assertNotNull(iconService))
2. icx_getTotalSupply 가져오는지 체크
3. icx_getBalance 체크
4. icx_getBlockByHeight 체크
5. icx_getBlockByHash 체크
6. icx_getLastBlock 체크
7. icx_getScoreApi 체크
8. icx_getTransactionByHash 체크
9. icx_getTransactionResult 체크
10. icx_call(hx -> cx), icx_sendTransaction(hx -> hx) 체크
11. token transfer 체크
12. not found 에러 일어나는지 체크
13. isRequestMatches

## IconServiceVCRTest
실제 http로 날라오는 값을 저장하여, 실사용 시나리오를 기반으로 아이콘 서비스를 테스트.

1. beforeEach로 세팅 셋업
2. icx_getBalance 테스트. 
4. icx_getBlockByHeight 체크
5. icx_getBlockByHash 체크
6. icx_getLastBlock 체크
7. icx_getScoreApi 체크
8. icx_getTransactionByHash 체크
9. icx_getTransactionResult 체크
10. sendICX, call, callWithParam, sendToken, deployScore, sendMessage, v2오브젝트테스트

## KeyWalletTest

1. beforeEach로 파일 읽기
2. privKey 불러들이기
3. createWallet 검증

```java
KeyWallet wallet = KeyWallet.create();
assertTrue(IconKeys.isValidAddress(wallet.getAddress().toString()));
Wallet loadWallet = KeyWallet.load(wallet.getPrivateKey());
assertEquals(wallet.getAddress(), loadWallet.getAddress());
```

4. testKeyStore 키스토어파일로 저장 함수 검증
5. testLoadKeyStore 키스토어파일 불러들이기 검증
 (wallet.getAddress.toString, 지갑주소 비교)
6. 이더 키스토어파일 불러들이는 함수 검증
7. wallet.sign 함수 검증
8. wallet.sign(null) 에러 검증

## SignedTransactionTest
1. icx 송금 rawTx serialize 함수 검증
2. callSendTx serialize 검증
(param 있을 경우, 없을 경우, payable 등등)
3. deploy tx serialize 검증
4. message tx serialize 검증
5. escapeString 검증  (transactionSerializer.escape 함수 검증)

## jsonrpc - AnnotationTest



# MEMO
상수 파일 따로 구분해서 정리할 것.
