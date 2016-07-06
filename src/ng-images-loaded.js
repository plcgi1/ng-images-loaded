(function(angular) {
    var app = angular.module('plcgi1.imagesloaded',[]);
    
    app.run(['$templateCache', function($templateCache) {
        $templateCache.put('ng-img-loaded.progressbar.tpl.html',
            '<div style="background:none repeat scroll 0 0 #393d46; border-radius:20px; padding:40px; position:fixed; left:40%; top:50px; z-index:2;" ng-show="progress>0">'
            +   '<progress value="{{progress}}" max="100"></progress>'
            +'</div>'
        );
    }]);
                    
    function progressBar($window) {
        return {
            restrict: 'EA',
            scope : {
                ngModel : '=ngModel'
            },
            require : 'ngModel',
            templateUrl: 'ng-img-loaded.progressbar.tpl.html',
            link: function(scope, element, attrs,ngModel) {
                scope.progress = 1;
                
                scope.$watch(function(){
                    if (!ngModel.$viewValue) {
                        return;
                    }                    
                    return ngModel.$viewValue;
                },
                function(model){
                    var els = angular.element.find('.ngimgloaded')[0].children;
                    if (!model) {
                        return;
                    }
                    var count = 0;
                    var percent = Math.ceil(100/model.length);
                    model.map(function(val,i){
                        var image = new Image();
                        image.onload = function(){
                            count++;
                            scope.progress += percent;
                            if (scope.progress>100) {
                                scope.progress = 0;
                            }
                        };
                        image.src = val.dataurl;
                    });
                });
            }
        };
    }
    /*
     * Pass functions to module
     */
    
    app.directive('ngImagesLoaded', ['$window',progressBar]);
})(angular);