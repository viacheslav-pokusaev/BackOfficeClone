$(document).ready(function(){
    $(".gowContainer").hover(function(){
        var element = $(this).find(".sideMenu-ul");
        element.removeClass("gow-sidebar-hidden");
        element.addClass("gow-sidebar-show");
    },function(){
        var element = $(this).find(".sideMenu-ul");
        element.addClass("gow-sidebar-hidden");
        element.removeClass("gow-sidebar-show");
    });

    $(".checkbox_filter_title").click(function(){
        if($(this).parent().find(".checkbox_filter").hasClass("filter_checked"))
        {
            RemoveCheckBoxElement($(this));
        }
        else {            
            $(this).parent().find(".checkbox_filter").addClass("filter_checked");     
        }         
        UpdateWaresBySelectedCategoryValue();
    });
    $(".checkbox_filter").click(function(){
        if($(this).hasClass("filter_checked")){
            RemoveCheckBoxElement($(this));
        }
        else{
            $(this).addClass("filter_checked");
        }    
        UpdateWaresBySelectedCategoryValue();
    }); 
    $("#searchElement").keyup(function(){
        if($(this).val().length >= 3)
        {
            $("#black-background").css("opacity", "0.6");
            $("#black-background").fadeIn(500);
            $(".search-container").addClass("search-container-above");
            $(".search-container .btn ").addClass("search-btn-above");
            $(".search-result-container-below-input").css("display","block");
            Search($(this).val(),$(".search-result-container-below-input"));
        }
        else{
            $("#black-background").css("opacity", "0");
            $("#black-background").fadeOut(500);
            $(".search-container").removeClass("search-container-above");
            $(".search-container .btn ").removeClass("search-btn-above");
            $(".search-result-container-below-input").css("display","none")
        }
    })
})

$(document).on({
    mouseenter: function(){
        $(this).find(".wareShortDescriptionContainer").css("display","flex");       
    },
    mouseleave: function(){
        $(this).find(".wareShortDescriptionContainer").css("display","none");      
    }
}, ".wareContainer");

$(document).on({
    mouseenter: function(){
        $(this).find("img").attr("src","/images/shop/like-full-hurt.png");      
    },
    mouseleave: function(){
        $(this).find("img").attr("src","/images/shop/like-emtry-hurt.png"); 
    }    
}, ".likeButton");

$(document).on({
    mouseenter: function(){
        $(this).find("img").attr("src","/images/shop/shopping-cart-white.png");      
    },
    mouseleave: function(){
        $(this).find("img").attr("src","/images/shop/shopping-cart-green.png"); 
    }    
}, ".basketButton");

function RemoveCheckBoxElement(currentElement){
    var checkedelement = currentElement.parent().find(".filter_checked");
    if(checkedelement.length)
    {       
        checkedelement.removeClass("filter_checked");
    }
}

function UpdateWaresBySelectedCategoryValue()
{
    var searchParams = [];
    var data;
    $(".filter-params   .filter_checked").each(function(){
        searchParams.push($(this).parent().find(".checkbox_filter_title")[0].textContent);       
    });
    if(searchParams.length > 0 )
    {
        data = { SearchParams : searchParams } ; 
    }
    else{
        //IF URL search parametr doesn't looks like ?groupOfWares=Acer , than this should be changed
        var gowName = window.location.search.slice(window.location.search.indexOf("=") + 1,window.location.search.length);
        data = { GOWName : gowName }
    }
   
    $.ajax({
        url:ShopUrlSettings.WareByCategoryValues,
        type:"POST",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: 'html'
     }).done(function(data,statusText,xhdr){
        $("#waresResult").html(data);
    }).fail(function (xhdr, statusText, errorText) {
        $("#waresResult").text(JSON.stringify(xhdr));
    });
}

function Search(searchText,changeElement){
    data = { Search : searchText }
    $.ajax({
        url:ShopUrlSettings.SearchURl,
        type:"POST",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: 'json'
     }).done(function(data,statusText,xhdr){
        changeElement.html(ParseSearchResult(data));
    }).fail(function (xhdr, statusText, errorText) {
        console.log(errorText);
    });
}

function ParseSearchResult(data){
    result = "";
    if(data.goWs.length > 0)
    {
        data.goWs.forEach(element => {
            result+= "<div class='search-result'><a href='#'><p>"+element.name+"</p></a></div>"
        });
    }
    if(data.categoryValues.length > 0)
    {
        data.goWs.forEach(element => {
            result+= "<div class='search-result'><a href='#'><p>"+element.name+"</p></a></div>"
        });
    }
    if(data.wares.length > 0){
        data.wares.forEach(element =>{
            result+= "<div class='search-result'><a href='#'><p>"+element.name+"</p></a></div>"
        })
    }
    if(result == "")
    {
        result = "<div class='search-result'><p style='text-align:center;'>Not Found</p></a></div>"
    }
    return result ;
}