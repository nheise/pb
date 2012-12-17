var http = require('http');

var restHttp = require('RESThttp');

var queryString = require('querystring');

var headerUtil = restHttp.httpHeaderUtil;
var headerKeys = headerUtil.keys;
var responseUtil = restHttp.responseUtil;
var contextUtil = restHttp.contextUtil;
var fileResponses = restHttp.fileResponses;

var foo = "hallo";

var page = {
    '425342' : {
      'href' : 'http://nheise.net/pb/page/425342',
      'head' : {
        'href' : 'http://nheise.net/pb/element/head/2383523',
        'children' : [
          'http://nheise.net/pb/element/style/435234'
        ]
      },
      'body' : {
        'href' : 'http://nheise.net/pb/element/body/724352',
        'children' : [
          'http://nheise.net/pb/element/h1/73645',
          'http://nheise.net/pb/element/div/264252'
        ]
      },
      dataObjects : {}
    },
    '534263' : {
      'href' : 'http://nheise.net/pb/page/534263',
      'head' : {
        'href' : 'http://nheise.net/pb/element/head/2383523',
        'children' : [
          'http://nheise.net/pb/element/style/435234',
          'http://nheise.net/pb/element/script/436235'
        ]
      },
      'body' : {
        'href' : 'http://nheise.net/pb/element/body/724352',
        'children' : [
          'http://nheise.net/pb/element/textarea/43726',
          'http://nheise.net/pb/element/button/7364537'
        ]
      },
      dataObjects : {}
    }
  };

var elementDefs = {
    'style' : {
      'href' : 'http://nheise.net/pb/element/style',
      'tag' : '<style type="text/css"></style>',
      'fields' : {
        'attributes' : [ ],
        'value' : ''
      }
    },
    'script' : {
      'href' : 'http://nheise.net/pb/element/script',
      'tag' : '<script type="text/javascript"></script>',
      'fields' : {
        'attributes' : [ ],
        'value' : ''
      }
    },
    'textfield' : {
      'href' : 'http://nheise.net/pb/element/textfield',
      'tag' : '<input type="text"></input>',
      'fields' : {
        'attributes' : [ 'class', 'value' ]
      }
    },
    'textarea' : {
      'href' : 'http://nheise.net/pb/element/textarea',
      'tag' : '<textarea></textarea>',
      'fields' : {
        'attributes' : [ 'class' ],
        'value' : ''
      }
    },
    'button' : {
      'href' : 'http://nheise.net/pb/element/button',
      'tag' : '<input type="button"></input>',
      'fields' : {
        'attributes' : [ 'class', 'value', 'onclick' ]
      }
    },
    'div' : {
      'href' : 'http://nheise.net/pb/element/div',
      'tag' : '<div></div>',
      'fields' : {
        'attributes' : [ 'class' ]
      }
    },
    'label' : {
      'href' : 'http://nheise.net/pb/element/label',
      'tag' : '<label></label>',
      'fields' : {
        'attributes' : [ 'for', 'class' ],
        'value' : ''
      }
    },
    'h1' : {
      'href' : 'http://nheise.net/pb/element/h1',
      'tag' : '<h1></h1>',
      'fields' : {
        'attributes' : [ 'class' ],
        'value' : ''
      }
    },
    'ul' : {
      'href' : 'http://nheise.net/pb/element/ul',
      'tag' : '<ul></ul>',
      'fields' : {
        'attributes' : [ 'class' ]
      }
    },
    'li' : {
      'href' : 'http://nheise.net/pb/element/li',
      'tag' : '<li></li>',
      'fields' : {
        'attributes' : [ 'class' ]
      }
    }
  };

var elements = {
    '435234' : {
      'href' : 'http://nheise.net/pb/element/style/435234',
      'type' : 'http://nheise.net/pb/element/style',
      'fieldDataMap' : {
        'attributes' : {},
        'value' : '* { margin: 0; padding: 0; font-family: verdana; font-size: 1em; outline: 0; width: 100%; } h1 { font-size: 1.3em; margin: 0px 5px 10px; } .tenantFields label, .tenantFields input, .tenantFields textarea, .tenantFields ul { display: block; margin-left: 5px;  } .tenantFields label { margin-top: 5px; } .tenantFields ul { border: 1px solid gray; background-color: white; }'
      }
    },
    '73645' : {
      'href' : 'http://nheise.net/pb/element/h1/73645',
      'type' : 'http://nheise.net/pb/element/h1',
      'fieldDataMap' : {
        'attributes' : {},
        'value' : 'Tenant'
      }
    },
    '264252' : {
      'href' : 'http://nheise.net/pb/element/div/264252',
      'type' : 'http://nheise.net/pb/element/div',
      'fieldDataMap' : {
        'attributes' : {
          'class' : 'tenantFields'
        }
      },
      'children' : [
        'http://nheise.net/pb/element/label/53426',
        'http://nheise.net/pb/element/textfield/534263',
        'http://nheise.net/pb/element/label/352436',
        'http://nheise.net/pb/element/textarea/423542',
        'http://nheise.net/pb/element/label/84756',
        'http://nheise.net/pb/element/ul/64538'
      ],
      'data' : { 
        'tenant' : {
          'href' : 'http://nheise.net/tenant/#{data.requestArgs.key}#'
        }
      }
    },
    '352436' : {
      'href' : 'http://nheise.net/pb/element/label/352436',
      'type' : 'http://nheise.net/pb/element/label',
      'fieldDataMap' : {
        'attributes' : {
          'for' : 'http://nheise.net/pb/element/textarea/423542',
          'class' : 'description'
        },
        'value' : 'Beschreibung'
      }
    },
    '423542' : {
      'href' : 'http://nheise.net/pb/element/textarea/423542',
      'type' : 'http://nheise.net/pb/element/textarea',
      'fieldDataMap' : {
        'attributes' : {},
        'value' : '#{data.tenant.description}#'
      }
    },
    '53426' : {
      'href' : 'http://nheise.net/pb/element/label/53426',
      'type' : 'http://nheise.net/pb/element/label',
      'fieldDataMap' : {
        'attributes' : {
          'for' : 'http://nheise.net/pb/element/textfield/534263'
        },
        'value' : 'Tenant-Key'
      }
    },
    '534263' : {
      'href' : 'http://nheise.net/pb/element/textfield/534263',
      'type' : 'http://nheise.net/pb/element/textfield',
      'fieldDataMap' : {
        'attributes' : { 'value' : '#{data.tenant.key}#' }
      }
    },
    '84756' : {
      'href' : 'http://nheise.net/pb/element/label/84756',
      'type' : 'http://nheise.net/pb/element/label',
      'fieldDataMap' : {
        'attributes' : {
          'for' : 'http://nheise.net/pb/element/ul/64538'
        },
        'value' : 'Sub Tenants'
      }
    },
    '64538' : {
      'href' : 'http://nheise.net/pb/element/ul/64538',
      'type' : 'http://nheise.net/pb/element/ul',
      'fieldDataMap' : {
        'attributes' : {  }
      },
      'dataIterator' : {
        'data' : '#{data.tenant.children}#',
        'var' : 'subTenant',
        'elementHref' : 'http://nheise.net/pb/element/li/53484'
      }
    },
    '53484' : {
      'href' : 'http://nheise.net/pb/element/li/53484',
      'type' : 'http://nheise.net/pb/element/li',
      'fieldDataMap' : {
        'attributes' : {
        },
        'value' : '#{data.subTenant.key}#'
      }
    },
    '43726' : {
      'href' : 'http://nheise.net/pb/element/textarea/43726',
      'type' : 'http://nheise.net/pb/element/textarea',
      'fieldDataMap' : {
        'attributes' : { 'id' : 'elementJson' },
        'value' : '#{JSON.stringify(data.element)}#'
      },
      'data' : { 
        'element' : {
          'href' : 'http://nheise.net/pb/element/type/#{data.requestArgs.id}#'
        }
      }
    },
    '7364537' : {
      'href' : 'http://nheise.net/pb/element/button/7364537',
      'type' : 'http://nheise.net/pb/element/button',
      'fieldDataMap' : {
        'attributes' : {
          'value' : 'Speichern',
          'onclick' : 'put( "http://nheise.net/pb/element/type/#{data.requestArgs.id}#", $( "#elementJson" ).val() );'
        }
      }
    },
    '436235' : {
      'href' : 'http://nheise.net/pb/element/script/436235',
      'type' : 'http://nheise.net/pb/element/script',
      'fieldDataMap' : {
        'attributes' : {},
        'value' : 'function put( uri, data ) { $.ajax( { url : uri, \'data\' : data, dataType : \'json\', type : \'PUT\', complete : function( jqXHR, textStatus ) { alert( textStatus );  } } ); }'
      }
    },
  };

var dpis = {
    'SYSTEM' : {
      'href' : 'http://nheise.net/tenant/SYSTEM',
      'dp' : 'http://nheise.net/tenant',
      'fields' : {
        'key' : 'SYSTEM',
        'name' : 'System',
        'description' : 'Der System Mandant.',
        'children' : [
          'http://nheise.net/tenant/SUB1SYSTEM',
          'http://nheise.net/tenant/SUB2SYSTEM'
        ]
      }
    },
    'SUB1SYSTEM' : {
      'href' : 'http://nheise.net/tenant/SUB1SYSTEM',
      'dp' : 'http://nheise.net/tenant',
      'fields' : {
        'key' : 'SUB1-SYSTEM',
        'name' : 'Sub1-System',
        'description' : 'Der erste Mandant unter dem System Mandant.',
        'parent' : 'http://nheise.net/tenant/SYSTEM'
      }
    },
    'SUB2SYSTEM' : {
      'href' : 'http://nheise.net/tenant/SUB2SYSTEM',
      'dp' : 'http://nheise.net/tenant',
      'fields' : {
        'key' : 'SUB2-SYSTEM',
        'name' : 'Sub2-System',
        'description' : 'Der zweite Mandant unter dem System Mandant.',
        'parent' : 'http://nheise.net/tenant/SYSTEM'
      }
    }
  };
  
  var dps = {
    'tenant' : {
      'href' : 'http://nheise.net/tenant',
      'name' : 'tenant',
      'fields' : [ 'key', 'name', 'description' ],
      'dpInstanceURIPatterns' : { 
        'entity' : 'http://nheise.net/tenant/#{key}#',
        'query' : 'http://nheise.net/tenant/'
      }
    }
  };

restHttp.modules.put( {
  id : 'testModule',
  resourceLocators : [
    {
      uriPattern : '/pb/page/{id}',
      methods : {
        GET : {
          'text/html' : fileResponses.createStreamFileResponse( function( context ) { return 'pb.html'; } ),
          'application/json' : function( context ) {
            contextUtil.prepare200( context, JSON.stringify( page[ context.request.args.id ] ) );
            responseUtil.send200( context );
          }
        }
      }
    },
    {
      uriPattern : '/pb/element/{id}',
      methods : {
        GET : {
          'application/json' : function( context ) {
            contextUtil.prepare200( context, JSON.stringify( elementDefs[ context.request.args.id ] ) );
            responseUtil.send200( context );
          }
        }
      }
    },
    {
      uriPattern : '/pb/element/{type}/{id}',
      methods : {
        GET : {
          'application/json' : function( context ) {
            contextUtil.prepare200( context, JSON.stringify( elements[ context.request.args.id ] ) );
            responseUtil.send200( context );
          }
        },
        PUT : {
          'application/json' : function( context ) {
            context.requestListener.on( 'data', function( data ) {
              elements[ context.request.args.id ] = JSON.parse( data.toString() );
              responseUtil.send200( context );
            });
          }
        }
      }
    },
    {
      uriPattern : '/pb/element/{type}/{id}/edit',
      methods : {
        GET : {
          'application/json' : function( context ) {
            http.get(
              {
                host : 'nheise.net',
                port : 80,
                path : '/pb/page/534263',
                method : 'GET',
                headers : { 'Accept' : 'application/json' }
              },
              function( response ) {
                response.on( 'data', function( data ) {
                  var pageObject = JSON.parse( data.toString() );
                  pageObject.dataObjects["requestArgs"] = { "id" : context.request.args.id };
                  contextUtil.prepare200( context, JSON.stringify( pageObject ) );
                  responseUtil.send200( context );
                });
              }
            );
          },
          'text/html' : fileResponses.createStreamFileResponse( function( context ) { return 'pb.html'; } )
        }
      }
    },
    {
      uriPattern : '/tenant',
      methods : {
        GET : {
          'application/json' : function( context ) {
            contextUtil.prepare200( context, JSON.stringify( dps[ 'tenant' ] ) );
            responseUtil.send200( context );
          }
        }
      }
    },
    {
      uriPattern : '/tenant/{id}',
      methods : {
        GET : {
          'application/json' : function( context ) {
            contextUtil.prepare200( context, JSON.stringify( dpis[ context.request.args.id ] ) );
            responseUtil.send200( context );
          }
        }
      }
    },
    {
      uriPattern : '/tenant/{id}/view',
      methods : {
        GET : {
          'application/json' : function( context ) {
            http.get( 
              { 
                host : 'nheise.net',
                port : 80,
                path : '/pb/page/425342',
                method : 'GET',
                headers : { 'Accept' : 'application/json' }
              },
              function( response ) {
                response.on( 'data', function( data ) {
                  var pageObject = JSON.parse( data.toString() );
                  pageObject.dataObjects["requestArgs"] = { "key" : context.request.args.id };
                  contextUtil.prepare200( context, JSON.stringify( pageObject ) );
                  responseUtil.send200( context );
                });
              }
            );
          },
          'text/html' : fileResponses.createStreamFileResponse( function( context ) { return 'pb.html'; } )
        }
      }
    }
  ]
});

restHttp.createServer( { name : 'pageBuilder', ip : 'localhost', port : 54321 } );
