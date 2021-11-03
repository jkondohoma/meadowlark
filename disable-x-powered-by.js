/**
 * It is also common for response headers to contain some information about the server,
indicating what type of server it is and sometimes even details about the operating
system. The downside about returning server information is that it gives hackers a
starting point to compromise your site. Extremely security-conscious servers often
omit this information or even provide false information.
 */

const express = require('express')
const app = express()

app.disable('x-powered-by')

app.get('*', (req, res) => {
  res.send(`Open your dev tools and examine your headers; ` +
    `you'll notice there is no x-powered-by header!`)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))