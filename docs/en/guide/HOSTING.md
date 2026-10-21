# Hosting, HTTP and carbon.txt

**English** | [Italiano](../../guide/HOSTING.md)

## Separate performance from provider claims

A host may serve a heavy page well; a light page may suffer from redirects,
missing compression or incorrect caching. Check both HTTP behavior and evidence
about the purchased service.

[Green Web Check](https://www.thegreenwebfoundation.org/support/how-does-the-green-web-check-work/)
relies on associating a domain with information in the verified-provider dataset.
A positive outcome concerns that verification, not site code; a negative outcome
can reflect missing information. Keep domain, date and evidence without turning
them into a zero-emissions claim.

## Evaluate the service

For your provider comparison, collect the actual service/location, public
environmental documents and their reporting period, backup/retention management,
caching/compression capabilities, HTTPS support, log access and content export.
Ask whether evidence covers the specific plan, rather than only part of the
organization. A European headquarters or nearby CDN alone does not establish
overall environmental performance.

The [Green Web Directory](https://www.thegreenwebfoundation.org/tools/directory/)
is a starting point for provider searches. Complete it with documents, project
constraints, resilience and people's needs.

## Check deployment with curl

Replace domain and paths. Use GET requests to inspect the actual response of
interest; HEAD may behave differently.

```sh
curl -sS -D - -o /dev/null -H 'Accept-Encoding: br, gzip' https://your-domain.example/
curl -sS -L -D - -o /dev/null https://your-domain.example/
curl -sS -D - -o /dev/null -H 'Accept-Encoding: br, gzip' https://your-domain.example/assets/style.VERSION.css
curl -sS -D - -o /dev/null https://your-domain.example/nonexistent-path/
```

Check status and redirect chains, Content-Type, Content-Encoding, Cache-Control
and Vary where relevant. A versioned asset can have long caching; HTML needs
a strategy allowing updates. Do not apply `immutable` to files that change at
the same URL. Check caching in the browser too, separating local and shared cache.
Reference: [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching).

For the nonexistent path, look for a real HTTP 404 and a useful page. A home
page returned with 200 for every URL makes diagnosis unclear. Check canonical
domain redirects and unnecessary hops too.

## Publish carbon.txt

[carbon.txt](https://carbontxt.org/) links provider and sustainability information
in a machine-readable format. Start with the [official builder and validator](https://carbontxt.org/tools):
collect evidence, fill fields required by the current syntax, publish the file
and verify resolution with the validator.

Do not copy the original site's provider into your project. First identify
your service provider and the documents you can link. The template does not
publish carbon.txt with invented claims.

Keep the file URL, validation result, document references and review date.
Valid syntax makes communication inspectable; it does not automatically
certify the statements.

## After release

Repeat Network on the public domain, check unexpected services, caching and
404s, and update provider evidence when the plan or infrastructure changes.
Reduce log frequency/retention only after considering operational needs and
requirements applicable to your service.
