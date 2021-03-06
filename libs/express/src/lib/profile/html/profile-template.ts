export const template = `<!DOCTYPE html>
<html>
    <head>
        <title><%= title %></title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism.css" />
        <style>
        body {  overflow-y: overlay; }
        </style>
    </head>
    <body class="pb-5">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary mb-5">
            <div class="container">
                <a class="navbar-brand" href=""><%= title %></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#--navbar" aria-controls="--navbar" aria-expanded="false" aria-label="Toggle Navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="--navbar">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="#--representation-classes">Classes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#--representation-properties">Properties</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#--state-transitions">Link Relation Types</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#--operations">Operations</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <main class="container" style="padding-top: 150px;">
            <header class="mb-5">
                <h1 class="mb-3"><%= title %></h1>

                <p class="lead"><%= description %></p>

                <dl class="row mt-5">
                    <dt class="col-2">Namespace</dt>
                    <dd class="col-10"><code class="text-dark"><%= namespace %></code></dd>
                    <% if (entryPoints.length > 0) { %>
                        <dt class="col-2">Entry Point(s)</dt>
                        <dd class="col-10">
                            <% entryPoints.forEach(({ name, uri, type, description }) => { %>
                                <code><a href="<%= uri %>" target="_blank"><%= uri %></a></code> &ndash;
                                <%= description %><br />
                                <small>Returns
                                    <% type.forEach(entryPointType => { %>
                                        <a href="#<%= entryPointType %>" class="font-weight-normal"><%= entryPointType %></a>
                                    <% }) %>.
                                </small>
                            </div>
                            <% }) %>
                        </dd>
                    <% } %>
                </dl>
            </header>

            <% if (representationClasses.length > 0) { %>
                <section style="padding-top: 100px" id="--representation-classes">
                    <h2 class="mb-4">Classes</h2>

                    <ul class="nav nav-pills row">
                        <% representationClasses.forEach(({ uri, localName }) => { %>
                        <li class="nav-item" title="<%= uri %>">
                            <a class="nav-link" href="#<%= localName %>"><%= localName %></a>
                        </li>
                        <% }) %>
                    </ul>

                    <% representationClasses.forEach(({ uri, localName, description, properties, stateTransitions, operations, schemas }) => { %>
                        <span id="<%= localName %>" style="position: relative; top: -50px"></span>
                        <h3 class="h4 mt-5" title="<%= uri %>">
                            <a href="#<%= localName %>" class="text-secondary" style="margin-left: -25px">#</a>
                            <%= localName %>
                        </h3>
                        <p class="lead"><%= description %></p>

                        <% if (properties.length > 0) { %>
                        <h4 class="h5 mb-3">Properties</h4>

                        <table class="table mb-4">
                            <tbody>
                                <% properties.forEach(({ uri: propertyUri, localName: propertyName, description: propertyDescription, range }) => { %>
                                <tr>
                                    <th scope="row" title="<%= propertyUri %>" style="width: 20%">
                                        <a href="#<%= propertyName %>" class="font-weight-normal"><%= propertyName %></a>
                                    </th>
                                    <td class="text-muted" style="width: 20%">
                                        <% range.forEach(({ localName: rangeName, isLocal, isSingleValue }) => { %>
                                            <% if (isLocal) { %>
                                            <%= rangeName %><%= isSingleValue ? '' : '[]' %>
                                            <% } else { %>
                                            <a href="#<%= rangeName %>"><%= rangeName %></a><%= isSingleValue ? '' : '[]' %>
                                            <% } %>
                                            <br />
                                        <% }) %>
                                    </td>
                                    <td style="width: 60%"><%= propertyDescription %></td style="width: 60%">
                                </tr>
                                <% }) %>
                            </tbody>
                        </table>
                        <% } %>

                        <% if (stateTransitions.length > 0) { %>
                        <h4 class="h5 mb-3">Links</h4>

                        <table class="table mb-4">
                            <tbody>
                                <% stateTransitions.forEach(({ uri: stateTransitionUri, localName: stateTransitionName, description: stateTransitionDescription, range }) => { %>
                                <tr>
                                    <th scope="row" title="<%= stateTransitionUri %>" style="width: 20%">
                                        <a href="#<%= stateTransitionName %>" class="font-weight-normal"><%= stateTransitionName %></a>
                                    </th>
                                    <td class="text-muted" style="width: 20%">
                                        <% range.forEach(({ localName: rangeName, isLocal, isSingleValue }) => { %>
                                            <% if (isLocal) { %>
                                            <%= rangeName %><%= isSingleValue ? '' : '[]' %>
                                            <% } else { %>
                                            <a href="#<%= rangeName %>"><%= rangeName %></a><%= isSingleValue ? '' : '[]' %>
                                            <% } %>
                                            <br />
                                        <% }) %>
                                    </td>
                                    <td style="width: 60%"><%= stateTransitionDescription %></td style="width: 60%">
                                </tr>
                                <% }) %>
                            </tbody>
                        </table>
                        <% } %>

                        <% if (operations.length > 0) { %>
                        <h4 class="h5 mb-3">Operations</h4>

                        <table class="table mb-4">
                            <tbody>
                                <% operations.forEach(({ uri: operationUri, localName: operationName, description: operationDescription, returnedType }) => { %>
                                <tr>
                                    <th scope="row" title="<%= operationUri %>" style="width: 20%">
                                        <a href="#<%= operationName %>" class="font-weight-normal"><%= operationName %></a>
                                    </th>
                                    <td class="text-muted" style="width: 20%">
                                        <% returnedType.forEach(({ localName: returnedTypeName, isLocal }) => { %>
                                            <% if (isLocal) { %>
                                            <%= returnedTypeName %>
                                            <% } else { %>
                                            <a href="#<%= returnedTypeName %>"><%= returnedTypeName %></a>
                                            <% } %>
                                            <br />
                                        <% }) %>
                                    </td>
                                    <td style="width: 60%"><%= operationDescription %></td style="width: 60%">
                                </tr>
                                <% }) %>
                            </tbody>
                        </table>
                        <% } %>

                        <% if (schemas.length > 0) { %>
                        <h4 class="h5 mb-3">Schemas</h4>

                        <div class="card">
                            <div class="card-header">
                                <ul class="nav nav-tabs card-header-tabs">
                                    <% schemas.forEach(({ localName: schemaName, targetType }, index) => { %>
                                    <li class="nav-item">
                                        <a class="nav-link<%= (index === 0) ? ' active' : '' %>" id="tab-<%= toHtmlId(schemaName) %>" data-toggle="tab" href="#<%= toHtmlId(schemaName) %>" role="tab" aria-controls="schemaName" aria-selected="true">
                                            <%= targetType %>
                                        </a>
                                    </li>
                                    <% }) %>
                                </ul>
                            </div>
                            <div class="tab-content">
                                <% schemas.forEach(({ localName: schemaName, uri: schemaUri, schemaType, targetType, schemaDefinition }, index) => { %>
                                <div class="tab-pane <%= (index === 0) ? ' show active' : '' %>" id="<%= toHtmlId(schemaName) %>" role="tabpanel" aria-labelledby="tab-<%= toHtmlId(schemaName) %>">
                                    <div class="card-body">
                                        <dl class="row mb-0">
                                            <dt class="col-2">Schema ID</dt>
                                            <dd class="col-10"><code class="text-dark"><%= schemaUri %></code></dd>
                                            <dt class="col-2">Schema Type</dt>
                                            <dd class="col-10 mb-0"><code class="text-dark"><%= schemaType %></code></dd>
                                        </dl>
                                    </div>
                                    <div class="border-top" style="height: 200px; overflow-y: auto; resize: vertical">
                                        <% if (schemaType.includes('json')) { %>
                                            <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-json"><%= schemaDefinition %></code></pre>
                                        <% } %>
                                        <% if (schemaType.includes('xml')) { %>
                                            <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-xml"><%= schemaDefinition %></code></pre>
                                        <% } %>
                                        <% if (!schemaType.includes('json') && !schemaType.includes('xml')) { %>
                                            <pre class="mb-0" style="background-color: white !important; overflow: visible"><code><%= schemaDefinition %></code></pre>
                                        <% } %>
                                    </div>
                                </div>
                                <% }) %>
                            </div>
                        </div>
                        <% } %>

                    <% }) %>
                </section>
            <% } %>

            <% if (representationProperties.length > 0) { %>
                <section style="padding-top: 100px" id="--representation-properties">
                    <h2 class="mb-4">Properties</h2>

                    <ul class="nav nav-pills row">
                        <% representationProperties.forEach(({ uri, localName }) => { %>
                        <li class="nav-item" title="<%= uri %>">
                            <a class="nav-link" href="#<%= localName %>"><%= localName %></a>
                        </li>
                        <% }) %>
                    </ul>

                    <% representationProperties.forEach(({ uri, localName, description, domain, range, schemas }) => { %>
                        <span id="<%= localName %>" style="position: relative; top: -20px"></span>
                        <h3 class="h4 mt-5" title="<%= uri %>">
                            <a href="#<%= localName %>" class="text-secondary" style="margin-left: -25px">#</a>
                            <%= localName %>
                        </h3>
                        <p class="lead"><%= description %></p>

                        <dl class="row">
                            <dt class="col-2">Used by</dt>
                            <dd class="col-10">
                                <% domain.forEach(({ localName: domainName, isLocal }) => { %>
                                    <% if (isLocal) { %>
                                    <%= domainName %>
                                    <% } else { %>
                                    <a href="#<%= domainName %>"><%= domainName %></a>
                                    <% } %>
                                    <br />
                                <% }) %>
                            </dd>
                            <dt class="col-2">Value Type</dt>
                            <dd class="col-10">
                                <% range.forEach(({ localName: rangeName, isLocal, isSingleValue }) => { %>
                                    <% if (isLocal) { %>
                                    <%= rangeName %><%= isSingleValue ? '' : '[]' %>
                                    <% } else { %>
                                    <a href="#<%= rangeName %>"><%= rangeName %></a><%= isSingleValue ? '' : '[]' %>
                                    <% } %>
                                    <br />
                                <% }) %>
                            </dd>
                        </dl>

                        <% if (schemas.length > 0) { %>
                        <a class="btn btn-outline-secondary btn-sm" data-toggle="collapse" href="#<%= toHtmlId(localName) %>-schemas" aria-expanded="false" aria-controls="<%= toHtmlId(localName) %>-schemas">
                            Show/Hide Schemas
                        </a>
                        <div class="collapse mt-4" id="<%= toHtmlId(localName) %>-schemas">
                            <div class="card">
                                <div class="card-header">
                                    <ul class="nav nav-tabs card-header-tabs">
                                        <% schemas.forEach(({ localName: schemaName, targetType }, index) => { %>
                                        <li class="nav-item">
                                            <a class="nav-link<%= (index === 0) ? ' active' : '' %>" id="tab-<%= toHtmlId(schemaName) %>" data-toggle="tab" href="#<%= toHtmlId(schemaName) %>" role="tab" aria-controls="schemaName" aria-selected="true">
                                                <%= targetType %>
                                            </a>
                                        </li>
                                        <% }) %>
                                    </ul>
                                </div>
                                <div class="tab-content">
                                    <% schemas.forEach(({ localName: schemaName, uri: schemaUri, schemaType, targetType, schemaDefinition }, index) => { %>
                                    <div class="tab-pane <%= (index === 0) ? ' show active' : '' %>" id="<%= toHtmlId(schemaName) %>" role="tabpanel" aria-labelledby="tab-<%= toHtmlId(schemaName) %>">
                                        <div class="card-body">
                                            <dl class="row mb-0">
                                                <dt class="col-2">Schema ID</dt>
                                                <dd class="col-10"><code class="text-dark"><%= schemaUri %></code></dd>
                                                <dt class="col-2">Schema Type</dt>
                                                <dd class="col-10 mb-0"><code class="text-dark"><%= schemaType %></code></dd>
                                            </dl>
                                        </div>
                                        <div class="border-top" style="height: 120px; overflow-y: auto; resize: vertical">
                                            <% if (schemaType.includes('json')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-json"><%= schemaDefinition %></code></pre>
                                            <% } %>
                                            <% if (schemaType.includes('xml')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-xml"><%= schemaDefinition %></code></pre>
                                            <% } %>
                                            <% if (!schemaType.includes('json') && !schemaType.includes('xml')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code><%= schemaDefinition %></code></pre>
                                            <% } %>
                                        </div>
                                    </div>
                                    <% }) %>
                                </div>
                            </div>
                        </div>
                        <% } %>
                    <% }) %>
                </section>
            <% } %>

            <% if (stateTransitions.length > 0) { %>
                <section style="padding-top: 100px" id="--state-transitions">
                    <h2 class="mb-4">Link Relation Types</h2>

                    <ul class="nav nav-pills row">
                        <% stateTransitions.forEach(({ uri, localName }) => { %>
                        <li class="nav-item" title="<%= uri %>">
                            <a class="nav-link" href="#<%= localName %>"><%= localName %></a>
                        </li>
                        <% }) %>
                    </ul>

                    <% stateTransitions.forEach(({ uri, localName, description, domain, range, schemas }) => { %>
                        <span id="<%= localName %>" style="position: relative; top: -20px"></span>
                        <h3 class="h4 mt-5" title="<%= uri %>">
                            <a href="#<%= localName %>" class="text-secondary" style="margin-left: -25px">#</a>
                            <%= localName %>
                        </h3>
                        <p class="lead"><%= description %></p>

                        <dl class="row">
                            <dt class="col-2">Used by</dt>
                            <dd class="col-10">
                                <% domain.forEach(({ localName: domainName, isLocal }) => { %>
                                    <% if (isLocal) { %>
                                    <%= domainName %>
                                    <% } else { %>
                                    <a href="#<%= domainName %>"><%= domainName %></a>
                                    <% } %>
                                    <br />
                                <% }) %>
                            </dd>
                            <dt class="col-2">Target Type</dt>
                            <dd class="col-10">
                                <% range.forEach(({ localName: rangeName, isLocal, isSingleValue }) => { %>
                                    <% if (isLocal) { %>
                                    <%= rangeName %><%= isSingleValue ? '' : '[]' %>
                                    <% } else { %>
                                    <a href="#<%= rangeName %>"><%= rangeName %></a><%= isSingleValue ? '' : '[]' %>
                                    <% } %>
                                    <br />
                                <% }) %>
                            </dd>
                        </dl>

                        <% if (schemas.length > 0) { %>
                        <a class="btn btn-outline-secondary btn-sm" data-toggle="collapse" href="#<%= toHtmlId(localName) %>-schemas" aria-expanded="false" aria-controls="<%= toHtmlId(localName) %>-schemas">
                            Show/Hide Schemas
                        </a>
                        <div class="collapse mt-4" id="<%= toHtmlId(localName) %>-schemas">
                            <div class="card">
                                <div class="card-header">
                                    <ul class="nav nav-tabs card-header-tabs">
                                        <% schemas.forEach(({ localName: schemaName, targetType }, index) => { %>
                                        <li class="nav-item">
                                            <a class="nav-link<%= (index === 0) ? ' active' : '' %>" id="tab-<%= toHtmlId(schemaName) %>" data-toggle="tab" href="#<%= toHtmlId(schemaName) %>" role="tab" aria-controls="schemaName" aria-selected="true">
                                                <%= targetType %>
                                            </a>
                                        </li>
                                        <% }) %>
                                    </ul>
                                </div>
                                <div class="tab-content">
                                    <% schemas.forEach(({ localName: schemaName, uri: schemaUri, schemaType, targetType, schemaDefinition }, index) => { %>
                                    <div class="tab-pane <%= (index === 0) ? ' show active' : '' %>" id="<%= toHtmlId(schemaName) %>" role="tabpanel" aria-labelledby="tab-<%= toHtmlId(schemaName) %>">
                                        <div class="card-body">
                                            <dl class="row mb-0">
                                                <dt class="col-2">Schema ID</dt>
                                                <dd class="col-10"><code class="text-dark"><%= schemaUri %></code></dd>
                                                <dt class="col-2">Schema Type</dt>
                                                <dd class="col-10 mb-0"><code class="text-dark"><%= schemaType %></code></dd>
                                            </dl>
                                        </div>
                                        <div class="border-top" style="height: 120px; overflow-y: auto; resize: vertical">
                                            <% if (schemaType.includes('json')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-json"><%= schemaDefinition %></code></pre>
                                            <% } %>
                                            <% if (schemaType.includes('xml')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-xml"><%= schemaDefinition %></code></pre>
                                            <% } %>
                                            <% if (!schemaType.includes('json') && !schemaType.includes('xml')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code><%= schemaDefinition %></code></pre>
                                            <% } %>
                                        </div>
                                    </div>
                                    <% }) %>
                                </div>
                            </div>
                        </div>
                        <% } %>
                    <% }) %>
                </section>
            <% } %>

            <% if (operations.length > 0) { %>
                <section style="padding-top: 100px" id="--operations">
                    <h2 class="mb-4">Operations</h2>

                    <ul class="nav nav-pills row">
                        <% operations.forEach(({ uri, localName }) => { %>
                        <li class="nav-item" title="<%= uri %>">
                            <a class="nav-link" href="#<%= localName %>"><%= localName %></a>
                        </li>
                        <% }) %>
                    </ul>

                    <% operations.forEach(({ uri, localName, description, domain, range, method, expectedBody, expectedQueryParams, constraints, returnedType, schemas }) => { %>
                        <span id="<%= localName %>" style="position: relative; top: -20px"></span>
                        <h3 class="h4 mt-5" title="<%= uri %>">
                            <a href="#<%= localName %>" class="text-secondary" style="margin-left: -25px">#</a>
                            <%= localName %>
                        </h3>
                        <p class="lead"><%= description %></p>

                        <% if (constraints.length > 0) { %>
                            <% constraints.forEach(({ description: constraintDescription }) => { %>
                            <p class="mb-4"><span class="badge badge-pill badge-warning mr-3">Precondition</span> <%= constraintDescription %></p>
                            <% }) %>
                        <% } %>

                        <dl class="row">
                            <dt class="col-2">Method</dt>
                            <dd class="col-10">
                                <span class="h5">
                                    <% if (method === 'POST') { %><code class="badge badge-success">POST</code><% } %>
                                    <% if (method === 'PUT') { %><code class="badge badge-primary">PUT</code><% } %>
                                    <% if (method === 'DELETE') { %><code class="badge badge-danger">DELETE</code><% } %>
                                    <% if (method === 'PATCH') { %><code class="badge badge-warning">PATCH</code><% } %>
                                    <% if (method === 'GET') { %><code class="badge badge-info">GET</code><% } %>
                                    <% if (!['POST', 'PUT', 'DELETE', 'PATCH', 'GET'].includes(method)) { %>
                                        <code class="badge badge-light"><%= method %></code>
                                    <% } %>
                                </span>
                            </dd>
                            <dt class="col-2">Used by</dt>
                            <dd class="col-10">
                                <% domain.forEach(({ localName: domainName, isLocal }) => { %>
                                    <% if (isLocal) { %>
                                    <%= domainName %>
                                    <% } else { %>
                                    <a href="#<%= domainName %>"><%= domainName %></a>
                                    <% } %>
                                    <br />
                                <% }) %>
                            </dd>
                            <dt class="col-2">Target Type</dt>
                            <dd class="col-10">
                                <% range.forEach(({ localName: rangeName, isLocal, isSingleValue }) => { %>
                                    <% if (isLocal) { %>
                                    <%= rangeName %><%= isSingleValue ? '' : '[]' %>
                                    <% } else { %>
                                    <a href="#<%= rangeName %>"><%= rangeName %></a><%= isSingleValue ? '' : '[]' %>
                                    <% } %>
                                    <br />
                                <% }) %>
                            </dd>
                            <dt class="col-2">Expected Query</dt>
                            <dd class="col-10">
                                <% if (expectedQueryParams.length > 0) { %>
                                    <% expectedQueryParams.forEach(name => { %>
                                        <a href="#<%= name %>"><%= name %></a>
                                        <br />
                                    <% }) %>
                                <% } else { %>
                                    <em class="text-muted">none</em>
                                <% } %>
                            </dd>
                            <dt class="col-2">Expected Body</dt>
                            <dd class="col-10">
                                <% if (expectedBody.length > 0) { %>
                                    <% expectedBody.forEach(name => { %>
                                        <a href="#<%= name %>"><%= name %></a>
                                        <br />
                                    <% }) %>
                                <% } else { %>
                                    <em class="text-muted">none</em>
                                <% } %>
                            </dd>
                            <dt class="col-2">Returned Type</dt>
                            <dd class="col-10">
                                <% returnedType.forEach(({ localName: returnedTypeName, isLocal }) => { %>
                                    <% if (isLocal) { %>
                                    <%= returnedTypeName %>
                                    <% } else { %>
                                    <a href="#<%= returnedTypeName %>"><%= returnedTypeName %></a>
                                    <% } %>
                                    <br />
                                <% }) %>
                            </dd>
                        </dl>

                        <% if (schemas.length > 0) { %>
                        <a class="btn btn-outline-secondary btn-sm" data-toggle="collapse" href="#<%= toHtmlId(localName) %>-schemas" aria-expanded="false" aria-controls="<%= toHtmlId(localName) %>-schemas">
                            Show/Hide Schemas
                        </a>
                        <div class="collapse mt-4" id="<%= toHtmlId(localName) %>-schemas">
                            <div class="card">
                                <div class="card-header">
                                    <ul class="nav nav-tabs card-header-tabs">
                                        <% schemas.forEach(({ localName: schemaName, targetType }, index) => { %>
                                        <li class="nav-item">
                                            <a class="nav-link<%= (index === 0) ? ' active' : '' %>" id="tab-<%= toHtmlId(schemaName) %>" data-toggle="tab" href="#<%= toHtmlId(schemaName) %>" role="tab" aria-controls="schemaName" aria-selected="true">
                                                <%= targetType %>
                                            </a>
                                        </li>
                                        <% }) %>
                                    </ul>
                                </div>
                                <div class="tab-content">
                                    <% schemas.forEach(({ localName: schemaName, uri: schemaUri, schemaType, targetType, schemaDefinition }, index) => { %>
                                    <div class="tab-pane <%= (index === 0) ? ' show active' : '' %>" id="<%= toHtmlId(schemaName) %>" role="tabpanel" aria-labelledby="tab-<%= toHtmlId(schemaName) %>">
                                        <div class="card-body">
                                            <dl class="row mb-0">
                                                <dt class="col-2">Schema ID</dt>
                                                <dd class="col-10"><code class="text-dark"><%= schemaUri %></code></dd>
                                                <dt class="col-2">Schema Type</dt>
                                                <dd class="col-10 mb-0"><code class="text-dark"><%= schemaType %></code></dd>
                                            </dl>
                                        </div>
                                        <div class="border-top" style="height: 120px; overflow-y: auto; resize: vertical">
                                            <% if (schemaType.includes('json')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-json"><%= schemaDefinition %></code></pre>
                                            <% } %>
                                            <% if (schemaType.includes('xml')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code class="language-xml"><%= schemaDefinition %></code></pre>
                                            <% } %>
                                            <% if (!schemaType.includes('json') && !schemaType.includes('xml')) { %>
                                                <pre class="mb-0" style="background-color: white !important; overflow: visible"><code><%= schemaDefinition %></code></pre>
                                            <% } %>
                                        </div>
                                    </div>
                                    <% }) %>
                                </div>
                            </div>
                        </div>
                        <% } %>
                    <% }) %>
                </section>
            <% } %>
        </main>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-core.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/autoloader/prism-autoloader.min.js"></script>
    </body>
</html>`
