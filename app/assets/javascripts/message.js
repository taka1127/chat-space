$(function(){

  function buildHTML(message) {
      
      image = (message.image) ? `<img class "lower-message__image" src=${message.image} >`: "";

      var html = `<div class="main-chat__messages__message" data-message-id="${message.id}">
                    <div class="main-chat__messages__message__list">
                      <div class="main-chat__messages__message__list__name">
                        ${message.user_name}
                      </div>
                      <div class="main-chat__messages__message__list__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat__messages__message__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div>`
    return html;
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
  var reloadMessages = function() {
   if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("message-id")
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
        $('.main-chat__messages').append(insertHTML);
      });
      $('.main-chat__messages').animate({scrollTop: $('.main-chat__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error');
    });
   }
  };
  setInterval(reloadMessages, 7000);
});