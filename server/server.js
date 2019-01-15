const express = require("express")
const bcrypt = require("bcryptjs")

const app = express()
app.use(express.json())
const port = 3005

app.post("/api/secure-info", (req, res) => {
    const { username, password } = req.body

    let secureUsername = "$2a$10$DygUAH6wgNmt1lCJOZjwkegSAcbOdkeiXFwH0WJl6k44nqdD0x2zm"
    let securePassword = "$2a$10$xnmYgJIwzODhHAXbcr6EeuNQbFvdX9XUnf6S41sOKfWDBElpHx3dG"

    //initially create username and password

    // bcrypt.genSalt(10, (err, salt) => {
    //     if(err) {
    //         console.log(err)
    //         res.status(500).send("can't salt")
    //     }
    //     else {
    //         bcrypt.hash(username, salt, (err, hash) => {
    //             if(err) {
    //                 console.log(err)
    //                 res.status(500).send("can't hash")
    //             }
    //             else {
                    
    //             }
    //         })
    //     }
    // })

    // bcrypt.genSalt(10, (err, salt) => {
    //     if(err) {
    //         console.log(err)
    //         res.status(500).send("can't salt")
    //     }
    //     else {
    //         bcrypt.hash(password, salt, (err, hash) => {
    //             if(err) {
    //                 console.log(err)
    //                 res.status(500).send("can't hash")
    //             }
    //             else {
    //                 securePassword = hash
    //                 console.log(hash)
    //                 res.status(200).send({secureUsername, securePassword})
    //             }
    //         })
    //     }
    // })

    // compare username and password

    bcrypt.compare(username, secureUsername, (err, response) => {
        if(err) {
            console.log(err)
            res.status(500).send("unable to compare")
        }
        else {
            if(response === false) {
                res.sendStatus(401)
            }
            else {
                bcrypt.compare(password, securePassword, (err, response) => {
                    if(err) {
                        res.status(500).send("unable to compare")
                    }
                    else {
                        if(response === false) {
                            res.sendStatus(401)
                        }
                        else {
                            res.sendStatus(200)
                        }
                    }
                })
            }
        }
    })
})

app.listen(port, () => console.log(`server listening on port ${port}`))