// 주소 조회 함수
function searchAddress() {
    var keyword = $('#address-input').val(); // 사용자가 입력한 주소 검색어
    var container = $('#address-list-view'); // 결과를 표시할 요소

    // 카카오 주소 검색 API 호출
    $.ajax({
        url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
        type: 'GET',
        data: {
            query: keyword
        },
        headers: {
            'Authorization': 'KakaoAK 4e21750c2b8367ad9b5d31de6b0e8030'
        },
        success: function (data) {
            if (data.documents.length > 0) {
                var html = '<ul>';
                $.each(data.documents, function (index, place) {
                    html += '<li>' + place.place_name + ': ' + place.address_name + '</li>';
                });
                html += '</ul>';
                container.html(html);
            } else {
                container.html('주소를 찾을 수 없습니다.');
            }
        },
        error: function () {
            container.html('주소 조회에 실패했습니다.');
        }
    });
}