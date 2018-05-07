function getPicture()
{
    $.getJSON("http://educaballero.000webhostapp.com/getImage.action",{}, function(data) {
        processPictureData(data);
    });
}
function processPictureData(data)
{
    $.each(data.PICTURE, function(i, product) {
        $('#productPic').attr('src', product.LOCAT);
    });
}