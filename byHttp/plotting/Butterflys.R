#install.packages("ggplot2")
#install.packages("zoo")
library(ggplot2)
library(zoo)
bttrflyCHww <- read.csv("./ButterflyKnifeCaseHardenedWW.csv")
# convert nodejs date to r date
bttrflyCHww$date <- as.POSIXct(as.numeric(bttrflyCHww$date / 1000), origin="1970-01-01", tz="CET")

#bttrflyCHww$lowest_price <- na.locf(bttrflyCHww$lowest_price)

bttrflyCHww$lowest_price <-gsub('--', '', bttrflyCHww$lowest_price)
bttrflyCHww$lowest_price <-gsub('[€]', '', bttrflyCHww$lowest_price)
bttrflyCHww$lowest_price

bttrflyCHww$lowest_price <- as.numeric(bttrflyCHww$lowest_price)
as.POSIXct(bttrflyCHww$date, origin="1970-01-01")

beginn <- as.numeric(as.POSIXct("2021-03-08 17:09:00"))
ende <- as.numeric(as.POSIXct("2021-03-20 19:14:00"))


pp <- ggplot(data=bttrflyCHww, aes(x = date, y = lowest_price, group = 1)) +
  geom_line(stat="identity", size = 1) +
  theme(axis.text.x = element_text(angle = 45)) +
  scale_y_continuous(breaks = seq(from = 100.0, to = 600.0, by = 50.0)) +
  scale_x_continuous(breaks = seq(from = as.POSIXct(beginn, origin="1970-01-01") , to = as.POSIXct(ende, origin="1970-01-01"), by = 80000)) +
  labs(title = "Butterfly Case Hardened WW",
       x = "Date",
       y = "Price"
  )
pp

bb <- ggplot(bttrflyCHww, aes(x=date, y=lowest_price)) +
  geom_point()+
  geom_line()+
  theme(axis.text.x = element_text(angle = 90)) +
  labs(title = "Butterfly Case Hardened WW",
       x = "Date",
       y = "Price"
  ) +
  geom_smooth(method=lm)
bb

ff <- ggplot(data=bttrflyCHww, aes(x = date, y = lowest_price, group = 1)) +
  geom_line(stat="identity",size = 1.1) +
  theme(axis.text.x = element_text(angle = 45)) +
  scale_x_continuous(breaks = seq(from = as.POSIXct(beginn, origin="1970-01-01") , to = as.POSIXct(ende, origin="1970-01-01"), by = 130000)) +
  labs(title = "Butterfly Case Hardened WW",
       x = "Date",
       y = "Price"
  ) +
  geom_smooth(method=lm)
ff