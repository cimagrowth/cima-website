'use client';

const ZoomIntegration = () => {
  return (
    <div className="container-wide px-4 md:px-6 py-12 md:py-20 max-w-4xl mx-auto">
      <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-accent-orange prose-a:no-underline hover:prose-a:underline">
        <h1 className="font-display text-3xl md:text-4xl font-[340] tracking-tight mb-4">Zoom Integration</h1>
        <p className="text-lg leading-relaxed mb-8">
          This guide explains how to connect a Zoom account to GrowthOS, how Zoom meetings are created when appointments are booked, and how to remove the integration.
        </p>

        <h2>What this integration does</h2>
        <p>
          When a GrowthOS user connects their Zoom account, GrowthOS can automatically create a Zoom meeting whenever a customer or prospect books an appointment through a GrowthOS booking page. The Zoom join URL and passcode are added to the calendar invite that goes to the attendee.
        </p>
        <p>GrowthOS only calls Zoom for two purposes:</p>
        <ul>
          <li>One read of the connecting user&apos;s email and account type at connect time, so that GrowthOS can display which Zoom account is in use.</li>
          <li>One create call per appointment booking, to schedule the Zoom meeting on the connecting user&apos;s behalf.</li>
        </ul>
        <p>
          GrowthOS does not access Zoom recordings, transcripts, participant lists, chat history, or contacts, and does not subscribe to any Zoom webhooks.
        </p>

        <h2>Adding the app</h2>

        <h3>Prerequisites</h3>
        <p>You need:</p>
        <ul>
          <li>A Zoom account (Basic, Licensed, or On-Prem all work).</li>
          <li>
            A GrowthOS account. If you don&apos;t have one yet, contact us at{' '}
            <a href="mailto:support@cimagrowth.com">support@cimagrowth.com</a>.
          </li>
        </ul>

        <h3>Steps to connect</h3>
        <ol>
          <li>
            Sign in to GrowthOS at{' '}
            <a href="https://os.cimagrowth.com" target="_blank" rel="noopener noreferrer">
              https://os.cimagrowth.com
            </a>
            .
          </li>
          <li>Open the Appointments section and click the Settings tab.</li>
          <li>Scroll to the Calendar Connections card. You&apos;ll see a section for Zoom alongside the section for Google Calendar.</li>
          <li>Click Connect Zoom. You will be redirected to Zoom&apos;s authorization page.</li>
          <li>
            Sign in to Zoom (if not already signed in) and review the requested permissions:
            <ul>
              <li>
                Create a meeting for a user (<code>meeting:write:meeting</code>) — required so GrowthOS can schedule meetings when bookings happen.
              </li>
              <li>
                View a user (<code>user:read:user</code>) — required so GrowthOS can display the email of the connected Zoom account.
              </li>
            </ul>
          </li>
          <li>Click Allow. Zoom will redirect you back to GrowthOS.</li>
          <li>You&apos;ll see a confirmation banner showing Zoom connected (your-email@example.com). The connection is now active.</li>
        </ol>
        <p>
          Each GrowthOS user connects their own Zoom account from their own login. If you have a sales team or multiple staff members, each person needs to connect their own Zoom from their own session. GrowthOS does not allow one user to connect Zoom on another user&apos;s behalf.
        </p>

        <h2>Using the app</h2>

        <h3>Choose Zoom as the meeting type for an appointment type</h3>
        <p>
          Once a Zoom account is connected, you can set Zoom as the meeting type for any appointment type you offer.
        </p>
        <ol>
          <li>Go to Appointments → Settings → Appointment Types.</li>
          <li>Edit an existing appointment type or create a new one.</li>
          <li>Under How does the meeting happen?, choose Zoom.</li>
          <li>Save.</li>
        </ol>
        <p>
          You can configure different appointment types to use different meeting platforms — for example, sales calls on Zoom, follow-ups on Google Meet, in-person consultations with no link. The meeting type is set per appointment type, not globally.
        </p>

        <h3>What happens when a booking is made</h3>
        <p>
          When someone books a time slot on a GrowthOS booking page for an appointment type configured to use Zoom:
        </p>
        <ol>
          <li>GrowthOS creates the appointment in its own database.</li>
          <li>GrowthOS calls the Zoom API to create a scheduled meeting using the connected user&apos;s account. The meeting topic, start time, duration, and timezone come from the appointment.</li>
          <li>GrowthOS receives the Zoom join URL and passcode.</li>
          <li>GrowthOS creates the corresponding event on the assigned user&apos;s Google Calendar (if Google Calendar is also connected) and includes the Zoom join URL in the event location and description.</li>
          <li>The calendar invite, including the Zoom link, is emailed to the attendee.</li>
        </ol>
        <p>
          If the assigned user has not connected Zoom, the appointment is still created and the calendar invite still goes out, but it does not include a Zoom link. The user can resolve this by connecting Zoom from Settings; existing future bookings on Zoom-enabled appointment types are automatically updated with Zoom links once the connection is established.
        </p>

        <h3>Manage the connection</h3>
        <p>
          In Appointments → Settings → Calendar Connections, the Zoom connection card shows:
        </p>
        <ul>
          <li>The email of the connected Zoom account.</li>
          <li>The account type (Basic, Licensed, or On-Prem).</li>
          <li>A status indicator (Active, Reauth Required, or Disconnected).</li>
        </ul>
        <p>
          If a connection enters a Reauth Required state (for example, if the account password changed or the user revoked access from Zoom directly), click Reconnect to repeat the connection flow.
        </p>

        <h2>Removing the app</h2>

        <h3>Disconnect from inside GrowthOS</h3>
        <ol>
          <li>
            Sign in to GrowthOS at{' '}
            <a href="https://os.cimagrowth.com" target="_blank" rel="noopener noreferrer">
              https://os.cimagrowth.com
            </a>
            .
          </li>
          <li>Open Appointments → Settings → Calendar Connections.</li>
          <li>On the Zoom connection card, click Disconnect.</li>
          <li>Confirm. GrowthOS will mark the connection as disconnected and stop making any further Zoom API calls on your behalf.</li>
        </ol>
        <p>
          After disconnecting, any appointment types still configured to use Zoom will continue to be bookable, but new bookings will not generate Zoom links until the user reconnects. The calendar event still gets created so the time block is preserved on the user&apos;s calendar.
        </p>

        <h3>Revoke access from inside Zoom</h3>
        <p>
          You can also revoke GrowthOS&apos;s access directly from your Zoom account at any time:
        </p>
        <ol>
          <li>
            Sign in to the Zoom App Marketplace at{' '}
            <a href="https://marketplace.zoom.us" target="_blank" rel="noopener noreferrer">
              https://marketplace.zoom.us
            </a>
            .
          </li>
          <li>Click Manage → Added Apps in the top navigation.</li>
          <li>Find GrowthOS in the list of installed apps.</li>
          <li>Click Remove.</li>
        </ol>
        <p>
          Revoking from Zoom directly invalidates the access and refresh tokens that GrowthOS holds. The next time GrowthOS tries to create a meeting on your behalf, the call will fail and your connection in GrowthOS will move to a Reauth Required state.
        </p>

        <h3>Data handling on removal</h3>
        <p>
          When you disconnect, GrowthOS retains the row that recorded your connection (with <code>status=&apos;disconnected&apos;</code>) for audit purposes, but the encrypted Zoom access and refresh tokens stored in our database are no longer used and are eligible for deletion. To request full deletion of your connection record and associated audit history, email{' '}
          <a href="mailto:support@cimagrowth.com?subject=Zoom%20integration%20deletion%20request">
            support@cimagrowth.com
          </a>{' '}
          with the subject &quot;Zoom integration deletion request.&quot;
        </p>
        <p>
          Zoom meetings that were already created in your Zoom account before disconnection remain in your Zoom account and are not deleted by the disconnect action — they are managed entirely within Zoom.
        </p>

        <h2>Troubleshooting</h2>

        <p>
          <strong>The &quot;Connect Zoom&quot; button does nothing or shows an error.</strong>
        </p>
        <p>
          Sign out of GrowthOS and sign back in to refresh your session, then try again. If the error persists, contact us at{' '}
          <a href="mailto:support@cimagrowth.com">support@cimagrowth.com</a> with a screenshot.
        </p>

        <p>
          <strong>My connection moved to &quot;Reauth Required.&quot;</strong>
        </p>
        <p>
          This happens when Zoom&apos;s tokens become invalid — usually because the GrowthOS app was removed from inside Zoom, the password was changed, or the user&apos;s Zoom account access was modified by an administrator. Click Reconnect to repeat the OAuth flow.
        </p>

        <p>
          <strong>Bookings are not getting Zoom links.</strong>
        </p>
        <p>Confirm three things in Appointments → Settings:</p>
        <ol>
          <li>The assigned user for the appointment type has Zoom connected (status: Active).</li>
          <li>The appointment type has its meeting type set to Zoom.</li>
          <li>There are no recent failures in the connection card&apos;s last error message.</li>
        </ol>
        <p>If all three are correct and links are still not generating, contact support.</p>

        <p>
          <strong>I want to switch the connected Zoom account.</strong>
        </p>
        <p>
          Click Disconnect, then click Connect Zoom and complete the OAuth flow with the new Zoom account. The new connection replaces the old one.
        </p>

        <h2>Support</h2>
        <p>
          For help with this integration, email{' '}
          <a href="mailto:support@cimagrowth.com">support@cimagrowth.com</a> or visit{' '}
          <a href="https://cimagrowth.com/support">https://cimagrowth.com/support</a>.
        </p>
      </article>
    </div>
  );
};

export default ZoomIntegration;
