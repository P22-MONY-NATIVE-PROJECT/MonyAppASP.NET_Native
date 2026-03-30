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

    private val CHANNEL_GENERAL = "general_channel"
    private val CHANNEL_MESSAGES = "messages_channel"
    private val GROUP_KEY_MESSAGES = "com.example.notification.MESSAGES"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
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
                        Button(onClick = { showSimpleNotification() }) {
                            Text("Звичайне (ID: 1)")
                        }

                        Button(onClick = { showMultipleNotification() }) {
                            Text("Окреме (Новий ID щоразу)")
                        }

                        Button(onClick = { showGroupedNotification() }) {
                            Text("У групу (Messages)")
                        }
                    }
                }
            }
        }
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            val general = NotificationChannel(CHANNEL_GENERAL, "Загальні", NotificationManager.IMPORTANCE_DEFAULT)
            val messages = NotificationChannel(CHANNEL_MESSAGES, "Повідомлення", NotificationManager.IMPORTANCE_HIGH)

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
    private fun showGroupedNotification() {
        val uniqueID = System.currentTimeMillis().toInt()

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