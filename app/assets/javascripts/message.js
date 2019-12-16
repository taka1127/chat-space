$(function(){
  function buildHTML(message){
    if (message.image){
      var html = `<div class="main-chat__messages__message" data-message-id="${message.id}">
                    <div class="main-chat__messages__message__list">
                      <div class="main-chat__messages__message__list__name">
                      ${message.user_name}
                      </div>
                      <div class="main-chat__messages__message__list__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="main-chat__messages__message__text">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      <img src=${message.image}>
                    </div>
                  </div>`
      return html;
    }  else {
      var html =`<div class="main-chat__messages__message" data-message-id="${message.id}">
                  <div class="main-chat__messages__message__list">
                    <div class="main-chat__messages__message__list__name">
                      ${message.user_name}
                    </div>
                    <div class="main-chat__messages__message__list__date">
                    ${message.date}
                    </div>
                  </div>
                  <div class="main-chat__messages__message__text">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                  </div>
                </div>`
      return html;
    };
  }
  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__messages').append(html)
      $('.main-chat__messages').animate({scrollTop: $('.main-chat__messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
    return false;
  });
});