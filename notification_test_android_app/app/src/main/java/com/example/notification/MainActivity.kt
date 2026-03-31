package com.example.notification

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.example.notification.ui.theme.NotificationTheme

class MainActivity : ComponentActivity() {

    //Канал усіх повідомлень
    private val CHANNEL_GENERAL = "general_channel"
    //Канал конкрених повідомлень, для незалежних повідомлень
    //Повідомлення буду іти окремо від загальних повідомлень
    private val CHANNEL_MESSAGES = "messages_channel"
    //Клю для повідомлень
    private val GROUP_KEY_MESSAGES = "com.example.notification.MESSAGES"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        //Створює канали для повідомлень
        createNotificationChannels()

        setContent {
            NotificationTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    androidx.compose.foundation.layout.Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding),
                        verticalArrangement = androidx.compose.foundation.layout.Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        //Звичайне повідомлення - якщо відправимо,
                        //то більше воно не може приходити, поки ми його не закриємо
                        Button(onClick = { showSimpleNotification() }) {
                            Text("Звичайне (ID: 1)")
                        }

                        //Багато різних повідомлень, окремо одне від одного
                        Button(onClick = { showMultipleNotification() }) {
                            Text("Окреме (Новий ID щоразу)")
                        }
                        //Повідомлення буде багато, але в одній кучі,
                        //Можна одне і теж повідомлення, багато разів надсилати
                        Button(onClick = { showGroupedNotification() }) {
                            Text("У групу (Messages)")
                        }
                    }
                }
            }
        }
    }

    private fun createNotificationChannels() {
        //Перевіряємо на версію Android SDK - чи віний device
        //24 або 26 sdk - minSdk = 30
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // NotificationManager - Головний клас для створення каналів
            // і по цих каналах можна створювати сповідення
            val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            //Повідомлення будуть по одному приходити
            val general = NotificationChannel(CHANNEL_GENERAL, "Загальні", NotificationManager.IMPORTANCE_DEFAULT)
            //CHANNEL_MESSAGES - група повідомлень
            val messages = NotificationChannel(CHANNEL_MESSAGES, "Повідомлення", NotificationManager.IMPORTANCE_HIGH)
            //Реєструємо канали повідомлень
            manager.createNotificationChannels(listOf(general, messages))
        }
    }

    // ЗАВЖДИ ОДНЕ
    private fun showSimpleNotification() {
        val builder = NotificationCompat.Builder(this, CHANNEL_GENERAL)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle("Статичне сповіщення")
            .setContentText("Я завжди маю ID 1, тому я одне")
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)

        notifyWithPermission(1, builder.build())
    }

    // БАГАТО ОКРЕМИХ
    private fun showMultipleNotification() {
        val uniqueID = System.currentTimeMillis().toInt()
        val builder = NotificationCompat.Builder(this, CHANNEL_GENERAL)
            .setSmallIcon(android.R.drawable.ic_btn_speak_now)
            .setContentTitle("Окреме сповіщення")
            .setContentText("Мій ID: $uniqueID")

        notifyWithPermission(uniqueID, builder.build())
    }

    // ГРУПУВАННЯ
    // ГРУПУВАННЯ
    private fun showGroupedNotification() {
        var uniqueID = System.currentTimeMillis().toInt()

        val builder = NotificationCompat.Builder(this, CHANNEL_MESSAGES)
            .setSmallIcon(android.R.drawable.stat_notify_chat)
            .setContentTitle("Чат")
            .setContentText("Нове повідомлення $uniqueID")
            .setGroup(GROUP_KEY_MESSAGES) // Ключ групи
            .setAutoCancel(true)

        val summary = NotificationCompat.Builder(this, CHANNEL_MESSAGES)
            .setSmallIcon(android.R.drawable.stat_notify_chat)
            .setGroup(GROUP_KEY_MESSAGES)
            .setGroupSummary(true) // Це робить сповіщення головним у групі
            .build()

        notifyWithPermission(uniqueID, builder.build())
        uniqueID = System.currentTimeMillis().toInt()
        notifyWithPermission(uniqueID, builder.build())
        uniqueID = System.currentTimeMillis().toInt()
        notifyWithPermission(uniqueID, builder.build())
        uniqueID = System.currentTimeMillis().toInt()
        notifyWithPermission(uniqueID, builder.build())
        notifyWithPermission(0, summary)
    }

    private fun notifyWithPermission(id: Int, notification: android.app.Notification) {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
            NotificationManagerCompat.from(this).notify(id, notification)
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.POST_NOTIFICATIONS), 101)
            }
        }
    }
}